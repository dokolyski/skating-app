import {Observable, of} from 'rxjs';
import {RestOptions, RestPath} from 'services/rest-service/Rest.service';
import * as REST_PATH from 'api/rest-url.json';
import {Injectable} from '@angular/core';
import {USER_INFO} from 'api/rest-types';
import {Profile} from 'api/rest-models/profile';

@Injectable()
export class RestServiceMock {
  static readonly skills = ['skill_1', 'skill_2', 'skill_3'];
  static readonly profiles: Profile[] = [
    {
      id: 0,
      user_id: 0,
      firstname: 'Jan1',
      lastname: 'Nowak1',
      birth_date: new Date(),
      skill_level: null,
      type: 'PROFILE'
    },
    {
      id: 1,
      user_id: 1,
      firstname: 'Jan2',
      lastname: 'Nowak2',
      birth_date: new Date(),
      skill_level: RestServiceMock.skills[0],
      type: 'PROFILE'
    },
    {
      id: 2,
      user_id: 2,
      firstname: 'Jan3',
      lastname: 'Nowak3',
      birth_date: new Date(),
      skill_level: RestServiceMock.skills[0],
      type: 'OWNER'
    }
  ];
  static sessions = [
    {session_id: 1, name: 'Session1', start_date: new Date('01/01/1990')},
    {session_id: 2, name: 'Session2', start_date: new Date('05/01/1990')},
  ];
  static notifications = [
    {title: 'Title1', description: 'Description1', session_id: 1},
    {title: 'Title2', description: 'Description2', session_id: 1},
    {title: 'Title3', description: 'Description3', session_id: 2},
    {title: 'Title4', description: 'Description4', session_id: 2},
  ];
  static userInfo: USER_INFO.GET.COMPILATION.OUTPUT = {
    id: 0, password: 'password',
    firstname: 'Jan1',
    lastname: 'Nowak1',
    birth_date: new Date(),
    email: 'example@mail.com',
    phone_number: '123456789'
  };

  do<ReturnType = void>(restPath: RestPath, options: RestOptions = {}): Observable<ReturnType> {
    console.log(restPath, options);
    console.log('profiles', RestServiceMock.profiles);
    switch (restPath) {
      case REST_PATH.CONFIG.GET:
        return of(RestServiceMock.skills as any);
      case REST_PATH.VERIFICATION.REGISTER:
        return of(null);
      case REST_PATH.PROFILES.EDIT:
        return of(null);
      case REST_PATH.PROFILES.GET_PROFILES:
        return of(RestServiceMock.profiles as any);
      case REST_PATH.SESSIONS.GET_SESSIONS:
        return of(RestServiceMock.sessions as any);
      case REST_PATH.NOTIFICATIONS.GET_NOTIFICATIONS:
        return of(RestServiceMock.notifications as any);
      case REST_PATH.USER_INFO.GET:
        return of(RestServiceMock.userInfo as any);
    }
  }
}
