import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { UiModule } from '@hsbc/ui';
import { RouterModule, Routes } from '@angular/router';
import { SubAppComponent } from './sub-app/sub-app.component';

const routes: Routes = [
  { path: 'app/:app', component: SubAppComponent },
  {
    path: 'appthree',
    loadChildren: () =>
      import('appthree/Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: 'appthree',
    loadChildren: () =>
      import('appthree/Module').then((m) => m.RemoteEntryModule),
  },
];

@NgModule({
  declarations: [AppComponent, SubAppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    UiModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
