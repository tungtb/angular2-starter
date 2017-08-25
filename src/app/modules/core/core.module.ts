/* tslint:disable:member-ordering no-unused-variable */
import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieModule } from 'ngx-cookie';

import { SharedModule } from '../shared/shared.module';

import { BaseComponent } from './components/base';
import { NavbarComponent } from './components/navbar';
import { LoginComponent } from './components/login';
import { NoContentComponent } from './components/no-content';
import { CoreRoutingModule } from './core.routes';

import { UserService } from './services/user.service';
import { LoadingService } from './services/loading.service';

@NgModule({
    imports: [CommonModule, CookieModule.forRoot(), SharedModule, CoreRoutingModule],
    declarations: [BaseComponent, NavbarComponent, LoginComponent, NoContentComponent],
    exports: [BaseComponent, NavbarComponent, LoginComponent, NoContentComponent],
    providers: [UserService, LoadingService]
})
export class CoreModule {

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    // static forRoot(config: UserServiceConfig): ModuleWithProviders {
    //     return {
    //         ngModule: CoreModule,
    //         providers: [
    //             { provide: UserServiceConfig, useValue: config }
    //         ]
    //     };
    // }
}
