import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@hsbc/services';

const apps: Record<string, string> = {
  'app-one': 'http://localhost:3002/',
  'app-two': 'http://localhost:3001/',
};

@Component({
  selector: 'hsbc-sub-app',
  templateUrl: './sub-app.component.html',
  styleUrls: ['./sub-app.component.css'],
})
export class SubAppComponent {
  public app = '';
  public appUrl: SafeResourceUrl | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    dom: DomSanitizer,
    private user: UserService
  ) {
    route.params.subscribe((params) => {
      this.app = params['app'];
      this.appUrl = dom.bypassSecurityTrustResourceUrl(apps[this.app]);
    });
  }

  announce() {
    this.user.announce();
  }
}
