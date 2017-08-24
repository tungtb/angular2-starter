import { NgModule }            from '@angular/core';

import { SharedModule }        from '../shared/shared.module';

import { HomeComponent }       from './components/home';
// import { HeroDetailComponent } from './hero-detail.component';
// import { HeroListComponent }   from './hero-list.component';
import { HomeRoutingModule }   from './home.routes';

@NgModule({
  imports: [ SharedModule, HomeRoutingModule ],
  declarations: [
    HomeComponent, 
    // HeroDetailComponent, HeroListComponent,
  ]
})
export class HomeModule { }
