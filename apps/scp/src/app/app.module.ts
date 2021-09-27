import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { UiModule } from '@poc/ui';
import { RouterModule, Routes } from '@angular/router';
import { SubAppComponent } from './sub-app/sub-app.component';

const routes: Routes = [
  {
    path: 'app/app-three',
    loadChildren: () =>
      import('appthree/Module').then((m) => m.RemoteEntryModule),
  },
  { path: 'app/:app', component: SubAppComponent },
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
