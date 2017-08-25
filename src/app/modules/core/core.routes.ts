import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseComponent } from './components/base';
import { LoginComponent } from './components/login';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'home', loadChildren: '../home/home.module#HomeModule' },
    ])],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
