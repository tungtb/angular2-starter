import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { LoadingService } from '../../services/loading.service';

@Component({
	selector: 'app-login',
	providers: [
		
	],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	private user: any = {
		email: '',
		password: ''
	};
	private loginError;

	constructor(
		private Router: Router,
		private Location: Location,
		private LoadingService: LoadingService,
		private UserService: UserService
	) {
		if (this.UserService.isLoggedIn()) {
			this.Location.back();
		}
	}

	ngOnInit() {
		console.log("Init Login");
	}

	formValid() {
		this.loginError = '';
		if (!this.user.email) {
			this.loginError += "<p>User email is required ! </p>";
		}
		if (!this.user.password) {
			this.loginError += "<p>User password is required !</p>";
		}
		return this.loginError.length > 0 ? false : true;
	}

	doSignIn() {
		if (this.formValid()) {
			this.LoadingService.showLoading("body");
			this.UserService.login({
				'login_id': 'z0000084',
				'password': 'soku',
				'login_type': 3
			})
				.subscribe((res) => {
					console.log('UserService', res['result']);
					this.LoadingService.hideLoading("body");
					this.UserService.setCookieUserInfo(res['result']);
					this.Router.navigate(['']);
				}, (err) => {
					this.LoadingService.hideLoading("body");
					console.log('UserService err', err);
				});
		}
	}

}
