import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';

import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Route[] = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(
        (mod) => mod.AboutComponent
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dashboard/routes').then(
        (mod) => mod.DASHBOARD_ROUTES
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
