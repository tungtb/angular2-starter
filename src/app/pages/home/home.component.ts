import {
    Component,
    ElementRef,
    OnInit
} from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

import { AppState } from '../../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { Config } from '../../config/config';
import { CoreService } from '../../services/core/core.service';
import { InterviewService } from '../../services/apis/interview/interview.service';
import { UserService } from '../../services/apis/user/user.service';

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'home'
    selector: 'home',  // <home></home>
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [
        Title,Config,CoreService,InterviewService,UserService
    ],
    // Our list of styles in our component. We may add more to compose many styles together
    styleUrls: ['./home.component.css'],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    // Set our default values
    public localState = { value: '' };

    // TypeScript public modifiers
    constructor(
        public appState: AppState,
        public title: Title,
        private router: Router,
        private _config: Config,
        private CoreService: CoreService,
        private InterviewService: InterviewService,
        private UserService: UserService
    ) {
        console.log('config', this._config.get('apiUrl'));
    }

    public ngOnInit() {
        console.log('hello `Home` component');
        var params = {
            'accesskey': 'GJNvCjj5USfvaKRloJZj1k44eGRyckljN3pWUTNKblhtdGNybElvWERWQlZPMUp1d3F5QVFwWTBSVkU'
        };
        this.InterviewService.post('shop/get_access_control', params)
            .subscribe((res) => {
                console.log('tungtb', res);
            }, (err) => {
                console.log('tungtb err', err);
            });
        if(!this.getUserSessionData()){
            this.UserService.login({
                    'login_id': 'z0000084',
                    'password': 'soku',
                    'login_type': 3
                })
                .subscribe((res) => {
                    console.log('UserService', res['result']);
                    this.UserService.setCookieUserInfo(res['result']);
                }, (err) => {
                    console.log('UserService err', err);
                });
        }
    }

    public getUserSessionData() {
        var userSessionData = this.UserService.getCookieUserInfo();
        console.log('userSessionData', userSessionData);
        return userSessionData;
    }

    public submitState(value: string) {
        console.log('submitState', value);
        this.appState.set('value', value);
        this.localState.value = '';
    }
}
