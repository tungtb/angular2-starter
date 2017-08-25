import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseComponent } from './components/base';
import { LoginComponent } from './components/login';
import { NoContentComponent } from './components/no-content';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'home', loadChildren: '../home/home.module#HomeModule' },
        { path: '**',    component: NoContentComponent },
    ])],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
