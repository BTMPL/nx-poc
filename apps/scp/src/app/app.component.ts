import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@poc/services';

@Component({
  selector: 'poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'scp';
  currentUser: string | undefined = undefined;
  constructor(private router: Router, private user: UserService) {
    user.getUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  loadApp(appName = '') {
    this.router.navigate([`/app/${appName}`]);
  }

  signIn() {
    this.user.signIn();
  }

  signOut() {
    this.user.signOut();
  }
}
