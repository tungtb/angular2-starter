import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './components/home';
import { HomeDetailComponent } from './components/home-detail.component';
import { HomeRoutingModule } from './home.routes';

@NgModule({
	imports: [SharedModule, HomeRoutingModule],
	declarations: [
		HomeComponent, HomeDetailComponent
	]
})
export class HomeModule { }
