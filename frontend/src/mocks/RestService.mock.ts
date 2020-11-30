import { Observable, of } from "rxjs";
import { RestOptions, RestPath } from "services/rest-service/Rest.service";
import * as REST_PATH from 'api/rest-url.json'
import { Injectable } from "@angular/core";

@Injectable()
export class RestServiceMock {
    do<ReturnType = void>(restPath: RestPath, options: RestOptions = {}): Observable<ReturnType> {
        console.log(restPath, options)
        switch(restPath) {
            case REST_PATH.CONFIG.GET:
                if(options.templateParamsValues['key'] == 'skillLevelPossibleValues') {
                    return of(['skill_1', 'skill_2', 'skill_3'] as any)
                }
            case REST_PATH.VERIFICATION.REGISTER:
                return of(null)
            case REST_PATH.PROFILES.EDIT:
                return of(null)
        }
    }
}