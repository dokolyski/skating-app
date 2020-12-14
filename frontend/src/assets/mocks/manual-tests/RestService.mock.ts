import { Observable, of } from "rxjs";
import { RestOptions, RestPath } from "services/rest-service/Rest.service";
import * as REST_PATH from 'api/rest-url.json'
import { Injectable } from "@angular/core";
import { PROFILES } from "api/rest-types";

@Injectable()
export class RestServiceMock {
    static readonly skills = ['skill_1', 'skill_2', 'skill_3']
    static readonly profiles: PROFILES.GET_PROFILES.OUTPUT = [
        {
            firstname: 'Jan1',
            lastname: 'Nowak1',
            birth_date: new Date(),
            skill_level: null,
            type: 'PROFILE'
        },
        {
            firstname: 'Jan2',
            lastname: 'Nowak2',
            birth_date: new Date(),
            skill_level: RestServiceMock.skills[0],
            type: 'PROFILE'
        },
        {
            firstname: 'Jan3',
            lastname: 'Nowak3',
            birth_date: new Date(),
            skill_level: RestServiceMock.skills[0],
            type: 'OWNER'
        }
    ]

    do<ReturnType = void>(restPath: RestPath, options: RestOptions = {}): Observable<ReturnType> {
        console.log(restPath, options)
        console.log('profiles', RestServiceMock.profiles)
        switch(restPath) {
            case REST_PATH.CONFIG.GET:
                if(options.templateParamsValues['key'] == 'skillLevelPossibleValues') {
                    return of(RestServiceMock.skills as any)
                }
            case REST_PATH.VERIFICATION.REGISTER:
                return of(null)
            case REST_PATH.PROFILES.EDIT:
                return of(null)
            case REST_PATH.PROFILES.GET_PROFILES:
                console.log('profiles', RestServiceMock.profiles)
                return of(RestServiceMock.profiles as any)
        }
    }
}