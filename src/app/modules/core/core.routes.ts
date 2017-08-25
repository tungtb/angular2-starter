import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseComponent } from './components/base';
import { LoginComponent } from './components/login';
import { NoContentComponent } from './components/no-content';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'login', component: LoginComponent },
        { path: 'base',    component: BaseComponent },
    ])],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
