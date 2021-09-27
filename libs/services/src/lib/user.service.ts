import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user$ = new BehaviorSubject<string | undefined>(undefined);

  private userName: string | undefined;
  constructor() {
    window.addEventListener('storage', () => {
      this.parseStorage(window?.localStorage?.getItem('userData'));
    });

    window.addEventListener('message', this.parseCrossEvent, false);

    this.parseStorage(window?.localStorage?.getItem('userData'));
  }

  signIn() {
    this.userName = 'TestUser';
    this.emit();
  }

  signOut() {
    this.userName = undefined;
    this.emit();
  }

  private parseCrossEvent = (
    event: MessageEvent<{ type: string; data: string }>
  ) => {
    if (event.data.type === 'storage') {
      this.parseStorage(JSON.stringify(event.data.data));
    }
  };

  public announce() {
    this.emit();
  }

  private parseStorage = (rawData: string | null = '{}') => {
    const data = JSON.parse(rawData || '{}');
    if (data.userName !== this.userName) {
      this.userName = data.userName;
      this.emit();
    }
  };

  private emit() {
    this.user$.next(this.userName);
    const data = {
      userName: this.userName,
    };
    window.localStorage.setItem('userData', JSON.stringify(data));

    // manually dispatch the event, as it is not propagated to the same window that triggers it
    window.dispatchEvent(new Event('storage'));

    /**
     * Dirty "hack" to dispatch the event to tabs embeded in iframes as well
     *
     * This way applications embeded via iframes don't need to be aware of how the
     * data is propagated to them etc. all the logic is encapsulated in the service
     * and it can be used the same way regardles of using iframes or module federation
     */
    window.document.querySelectorAll('iframe').forEach((frame) => {
      const origin = frame?.getAttribute('src') || '';
      if (origin) {
        frame?.contentWindow?.postMessage({ type: 'storage', data }, origin);
      }
    });
  }

  getUser() {
    return this.user$;
  }
}
