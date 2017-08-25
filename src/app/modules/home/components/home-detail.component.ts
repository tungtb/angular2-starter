import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../../modules/core/services/user.service';

@Component({
    selector: 'home-detail',
    providers: [

    ],
    template: '<div>Home detail {{detailId}}</div>'
})
export class HomeDetailComponent implements OnInit {

    private detailId = null;

    constructor(
        private ActivatedRoute: ActivatedRoute,
        private UserService: UserService
    ) {

    }

    ngOnInit() {
        this.processParam();
    }

    processParam() {
        this.ActivatedRoute.paramMap.map((params: ParamMap) => {
            return params.get('id');
        }).subscribe((id: string) => {
            this.detailId = id;
        })
        
    }

}
