import { NgModule } from '@angular/core';
import {
	Routes,
	RouterModule
} from '@angular/router';

import { HomeComponent } from './components/home';
import { HomeDetailComponent }   from './components/home-detail.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{ path: ':id', component: HomeDetailComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule { }
