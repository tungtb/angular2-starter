import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home';
import { AboutComponent } from './pages/about';
import { NoContentComponent } from './pages/no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home/:id',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: './pages/+detail#DetailModule'},
  { path: 'barrel', loadChildren: './pages/+barrel#BarrelModule'},
  { path: '**',    component: NoContentComponent },
];
