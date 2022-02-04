import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IAppConfig } from "./shared/models/app-config.model";

@Injectable({
    providedIn: 'root'
})
export class AppConfig {

    static settings: IAppConfig

    constructor(
        private http: HttpClient
    ) {}

    load(): Promise<any> {
        const jsonFile = 'assets/config/config.' + environment.envName + '.json';
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then(response => {
                AppConfig.settings = response as IAppConfig;
                resolve();
            }).catch((response: any) => {
                reject('Could not load file ' + jsonFile + ': ' + JSON.stringify(response));
            });
        });
    }

}
