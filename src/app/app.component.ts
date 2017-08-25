/*
 * Angular 2 decorators and services
 */
import {
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { Router } from '@angular/router';
import { UserService } from './modules/core/services/user.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './app.component.css'
    ],
    template: '<app-navbar></app-navbar><router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

    private userLoginData = null;

    constructor(
        public appState: AppState,
        private Router: Router,
        private UserService: UserService
    ) {
        this.checkLogin();
    }

    public ngOnInit() {
        console.log('Initial App State', this.appState.state);
    }

    private checkLogin() {
        this.userLoginData = this.UserService.getCookieUserInfo();
        console.log("AppComponent checkLogin", this.userLoginData);
        if (!this.userLoginData) {
            this.Router.navigate(['/login']);
        }
    }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
