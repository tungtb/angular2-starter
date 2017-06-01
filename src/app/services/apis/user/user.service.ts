import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { CoreService } from "../../core/core.service";
import { Http } from "@angular/http";

@Injectable()
export class UserService extends CoreService {

    constructor(_http: Http, private _cookieService: CookieService) {
        super(_http);
    }

    public login(params) {
        params.device_id = this.genUUID();
        params.user_agent = navigator.userAgent;
        return this.post('user/login', params);
    }

    public setCookieUserInfo(userData) {
        this._cookieService.putObject('userSession', userData);
    }

    public getCookieUserInfo() {
        return this._cookieService.getObject('userSession');
    }

    private S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    private genUUID() {
        return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0,3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
    }
}
