import { Component } from '@angular/core';
import { UserService } from '@hsbc/services';

@Component({
  selector: 'hsbc-root',
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
