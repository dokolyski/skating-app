import {Observable, of} from 'rxjs';
import {RestOptions, RestPath} from 'services/rest-service/Rest.service';
import * as REST_PATH from 'api/rest-url.json';
import {Injectable} from '@angular/core';
import {USERS} from 'api/rest-types';
import {ProfileRequest as Profile} from 'api/rest-models/profile-request';
import * as CONFIG from 'assets/config/config.rest.json';
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
    {id: 1, name: 'Session1', start_date: new Date('01/01/1990')},
    {id: 2, name: 'Session2', start_date: new Date('05/01/1990')},
  ];
  static notifications = [
    {title: 'Title1', description: 'Description1', session_id: 1, expiration_date: new Date('01/01/1990')},
    {title: 'Title2', description: 'Description2', session_id: 1, expiration_date: new Date('01/01/1991')},
    {title: 'Title3', description: 'Description3', session_id: 2, expiration_date: new Date('01/01/1992')},
    {title: 'Title4', description: 'Description4', session_id: 2, expiration_date: new Date('01/01/1993')},
    {title: 'Title4', description: 'Description4', session_id: 2, expiration_date: new Date('01/01/1993')},
    {title: 'Title4', description: 'Description4', session_id: 2, expiration_date: new Date('01/01/1993')},
    {title: 'Title4', description: 'Description4', session_id: 2, expiration_date: new Date('01/01/1993')},
    {title: 'Title4', description: 'Description4', session_id: 2, expiration_date: new Date('01/01/1993')},
    {title: 'Title4', description: 'Description4', session_id: 2, expiration_date: new Date('01/01/1993')},
    {title: 'Title4', description: 'Description4', session_id: 2, expiration_date: new Date('01/01/1993')},

  ];
  static userInfo: USERS.GET.OUTPUT = {
    id: 0, password: 'password',
    firstname: 'Jan1',
    lastname: 'Nowak1',
    birth_date: new Date(),
    email: 'example@mail.com',
    phone_number: '123456789',
    isOrganizer: false,
    isAdmin: false,
    isHAdmin: false,
  };
  static priceTable = [
    {
      required_money: 123,
      points: 10
    },
    {
      required_money: 666,
      points: 33
    }
  ];
  static allUsers: USERS.ALL.OUTPUT = [
    {
      id: 0, password: 'password',
      firstname: 'Jan',
      lastname: 'Nowak',
      birth_date: new Date(),
      email: 'example@mail.com',
      phone_number: '123456789',
      isOrganizer: false,
      isAdmin: false,
      isHAdmin: false,
    },
    {
      id: 1, password: 'password',
      firstname: 'Jan1',
      lastname: 'Nowak1',
      birth_date: new Date(),
      email: 'example@mail.com',
      phone_number: '123456789',
      isOrganizer: true,
      isAdmin: false,
      isHAdmin: false,
    },
    {
      id: 2, password: 'password',
      firstname: 'Jan2',
      lastname: 'Nowak2',
      birth_date: new Date(),
      email: 'example@mail.com',
      phone_number: '123456789',
      isOrganizer: true,
      isAdmin: true,
      isHAdmin: false,
    },
    {
      id: 3, password: 'password',
      firstname: 'Jan3',
      lastname: 'Nowak3',
      birth_date: new Date(),
      email: 'example@mail.com',
      phone_number: '123456789',
      isOrganizer: false,
      isAdmin: true,
      isHAdmin: true,
    }
  ];

  do<ReturnType = void>(restPath: RestPath, options: RestOptions = {}): Observable<ReturnType> {
    switch (restPath) {
      case REST_PATH.CONFIG.GET:
        return this.handleConfig(options);
      case REST_PATH.VERIFICATION.REGISTER:
        return of(null);
      case REST_PATH.VERIFICATION.LOGIN:
        return of({token: 'token', uid: 1, isOrganizer: false, isAdmin: false, isHAdmin: false} as any);
      case REST_PATH.VERIFICATION.LOGOUT:
        return of(null);
      case REST_PATH.PROFILES.EDIT:
        return of(null);
      case REST_PATH.PROFILES.GET:
        return of(RestServiceMock.profiles as any);
      case REST_PATH.SESSIONS.GET_SESSIONS:
        return of(RestServiceMock.sessions as any);
      case REST_PATH.NOTIFICATIONS.GET_NOTIFICATIONS:
        return of(RestServiceMock.notifications as any);
      case REST_PATH.USERS.GET:
        return of(RestServiceMock.userInfo as any);
      case REST_PATH.USERS.ALL:
        return of(RestServiceMock.allUsers as any);
    }
  }

  private handleConfig(options) {
    switch(options.templateParamsValues.key) {
      case CONFIG.fb_link:
        return of('http://www.facebook.pl');
      case CONFIG.price_table:
        return of(RestServiceMock.priceTable);
      case CONFIG.skills:
        return of(RestServiceMock.skills as any);
    }
  }
}
