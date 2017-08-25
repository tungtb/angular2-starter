import {
    Component,
    ElementRef,
    OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../../../core/services/loading.service';
import { UserService } from '../../../core/services/user.service';

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'home'
    selector: 'home',  // <home></home>
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [

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
    private users = [];

    // TypeScript public modifiers
    constructor(
        private Router: Router,
        private LoadingService: LoadingService,
        private UserService: UserService
    ) {
        this.users = this.UserService.get('userList');
    }

    public ngOnInit() {
        console.log('hello `Home` component');
    }

    updateList() {
        this.LoadingService.showLoading("body");
        setTimeout(() => {
            this.UserService.add();
            this.LoadingService.hideLoading("body");
        }, 3000);
        console.log("Emit scroll");
    }

    addAdoptionItem() {
        // this.AdoptionService.add();
    }

    getAdoptionList() {
        // console.log(this.AdoptionService.get('adoptionList'));
    }

    showAdoptionDetail(detailId) {
        // this.Router.navigate(['/home-detail', detailId]);
    }
}
