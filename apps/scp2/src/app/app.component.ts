import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hsbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'scp';
  constructor(private router: Router) {}

  loadApp(appName = '') {
    this.router.navigate([`/app/${appName}`]);
  }
}
