import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

const apps: Record<string, string> = {
  'app-one': 'http://localhost:56168/',
  'app-two': 'http://localhost:49831/',
};

@Component({
  selector: 'hsbc-sub-app',
  templateUrl: './sub-app.component.html',
  styleUrls: ['./sub-app.component.css'],
})
export class SubAppComponent {
  public app = '';
  public appUrl: SafeResourceUrl | undefined = undefined;

  constructor(private route: ActivatedRoute, dom: DomSanitizer) {
    route.params.subscribe((params) => {
      this.app = params['app'];
      this.appUrl = dom.bypassSecurityTrustResourceUrl(apps[this.app]);
    });
  }
}
