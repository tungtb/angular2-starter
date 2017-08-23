import {
    Component,
    ElementRef,
    OnInit
} from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

import { AppState } from '../../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
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
        Title,CoreService,InterviewService,UserService
    ],
    // Our list of styles in our component. We may add more to compose many styles together
    styleUrls: ['./home.component.css'],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    // Set our default values
    public localState = { value: '' };
    private userLoginData;

    // TypeScript public modifiers
    constructor(
        public appState: AppState,
        public title: Title,
        public router: Router,
        private CoreService: CoreService,
        private InterviewService: InterviewService,
        public UserService: UserService
    ) {
        
    }

    public ngOnInit() {
        console.log('hello `Home` component');
        this.getUserSessionData();
        // var params = {
        //     'accesskey': 'GJNvCjj5USfvaKRloJZj1k44eGRyckljN3pWUTNKblhtdGNybElvWERWQlZPMUp1d3F5QVFwWTBSVkU'
        // };
        // this.InterviewService.post('shop/get_access_control', params)
        //     .subscribe((res) => {
        //         console.log('tungtb', res);
        //     }, (err) => {
        //         console.log('tungtb err', err);
        //     });
    }

    public getUserSessionData() {
        this.userLoginData = this.UserService.getCookieUserInfo();
    }

    public submitState(value: string) {
        console.log('submitState', value);
        this.appState.set('value', value);
        this.localState.value = '';
    }
}
