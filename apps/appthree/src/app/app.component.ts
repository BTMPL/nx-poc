import { Component } from '@angular/core';
import { UserService } from '@hsbc/services';

@Component({
  selector: 'hsbc-app-three',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'appthree';

  currentUser: string | undefined;

  constructor(private user: UserService) {
    user.getUser().subscribe((user) => (this.currentUser = user));
  }
}
