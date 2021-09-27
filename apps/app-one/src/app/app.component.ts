import { Component } from '@angular/core';
import { UserService } from '@poc/services';

@Component({
  selector: 'poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app-one';
  currentUser: string | undefined;

  constructor(private user: UserService) {
    user.getUser().subscribe((user) => {
      this.currentUser = user;
    });
  }
}
