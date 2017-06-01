import { Injectable } from "@angular/core";

@Injectable()
export class Config {
    private _config: Object
    private _env: Object
    constructor() {
        this.initConfigData();
    }

    initConfigData() {
        this._config = {};
        this._env = {};
        this._config['apiUrl'] = "https://www-dev.sokujob.com/webapi/v3/";
    }

    getEnv(key: any) {
        return this._env[key];
    }
    get(key: any) {
        return this._config[key];
    }
};