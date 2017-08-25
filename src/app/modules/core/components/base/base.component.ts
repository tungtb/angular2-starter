import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-base',
	providers: [

	],
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.css']
})

export class BaseComponent implements OnInit {

	private UserLoginData = null;

	constructor(
		public Router: Router,
		public UserService: UserService
	) { }

	ngOnInit() {
		console.log("BaseComponent ngOnInit");
	}
}
