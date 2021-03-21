import { Observable, of } from 'rxjs';
import { RestOptions, RestPath } from 'services/rest-service/rest.service';
import * as REST_PATH from 'api/rest-url.json';
import { Injectable } from '@angular/core';
import { ProfileResponse } from 'api/responses/profile.dto';
import { UserResponse } from 'api/responses/user.dto';
import * as CONFIG from 'assets/config/config.rest.json';
import SessionResponse from 'api/responses/session.dto';
import { NotificationResponse } from 'api/responses/notification.dto';

@Injectable()
export class RestServiceMock {
  static readonly skills = ['skill_1', 'skill_2', 'skill_3'];
  static readonly profiles: ProfileResponse[] = [
    {
      id: 0,
      user_id: 0,
      firstname: 'Jan1',
      lastname: 'Nowak1',
      birth_date: new Date(),
      skill_level: null,
      is_owner: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1,
      user_id: 1,
      firstname: 'Jan2',
      lastname: 'Nowak2',
      birth_date: new Date(),
      skill_level: RestServiceMock.skills[0],
      is_owner: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      user_id: 2,
      firstname: 'Jan3',
      lastname: 'Nowak3',
      birth_date: new Date(),
      skill_level: RestServiceMock.skills[0],
      is_owner: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  static sessions: SessionResponse[] = [
    {
      id: 0,
      name: 'naemwer ew fwe ',
      start_date: new Date(),
      end_date: new Date(),
      max_participants: 10,
      difficulty: 'grupa srebrna',
      price: 35,
      description: 'oepwqeqwe weqo pewoq pewo peowqp ewq',
      status: 'open',
      owner: {} as any,
      updatedAt: new Date(),
      profiles: [],
      createdAt: new Date()
    },
    {
      id: 1,
      name: 'naemdaw dwa daw dwda',
      start_date: new Date(),
      end_date: new Date(),
      max_participants: 14,
      difficulty: 'grupa brązowa+',
      price: 35,
      description: 'oepwqeqoq wqp ewq',
      status: 'closed',
      owner: {} as any,
      updatedAt: new Date(),
      profiles: [{
        id: 0,
        user_id: 0,
        firstname: 'Dominik',
        lastname: 'Kalinowski',
        birth_date: new Date('09/19/1998'),
        present: false
      }, {
        id: 1,
        user_id: 0,
        firstname: 'Anna',
        lastname: 'Weidemann',
        birth_date: new Date('04/13/1999'),
        present: true
      }],
      createdAt: new Date()
    }
  ];
  static notifications: NotificationResponse[] = [
    {
      id: 0,
      user_id: 0,
      session_id: 0,
      show_date: new Date(),
      status: '',
      title: 'Title1',
      description: 'Description1',
      expiration_date: new Date('01/01/1990'),
      owner: { firstname: '', lastname: '', email: '' }
    },
    {
      id: 1,
      user_id: 0,
      session_id: 0,
      show_date: new Date(),
      status: '',
      title: 'Title1',
      description: 'Description1',
      expiration_date: new Date('01/01/1991'),
      owner: { firstname: '', lastname: '', email: '' }
    },
    {
      id: 2,
      user_id: 0,
      session_id: 1,
      show_date: new Date(),
      status: '',
      title: 'Title1',
      description: 'Description1',
      expiration_date: new Date('01/01/1992'),
      owner: { firstname: '', lastname: '', email: '' }
    }
  ];
  static userInfo: UserResponse = {
    isAdmin: false, isHAdmin: false, isOrganizer: false,
    id: 0, password: 'password',
    email: 'example@mail.com',
    phone_number: '123456789',
    createdAt: new Date(),
    pointsAmount: 100,
    verified: true, token: '',
    password_reset_token: '',
    password_reset_token_expiration_date: new Date(),
    updatedAt: new Date()
  };
  static priceTable = [
    {
      required_money: 123,
      points: 10
    },
    {
      required_money: 666.5,
      points: 33
    }
  ];
  static allUsers: UserResponse[] = [
    {
      id: 0, password: 'password',
      email: 'example@mail.com',
      phone_number: '123456789',
      isAdmin: false, isHAdmin: false, isOrganizer: false,
      createdAt: new Date(),
      pointsAmount: 0,
      verified: true, token: '',
      password_reset_token: '',
      password_reset_token_expiration_date: new Date(),
      updatedAt: new Date()
    },
    {
      id: 0, password: 'password',
      email: 'example@mail.com',
      phone_number: '123456789',
      isAdmin: false, isHAdmin: false, isOrganizer: true,
      createdAt: new Date(),
      pointsAmount: 0,
      verified: true, token: '',
      password_reset_token: '',
      password_reset_token_expiration_date: new Date(),
      updatedAt: new Date()
    },
    {
      id: 0, password: 'password',
      email: 'example@mail.com',
      phone_number: '123456789',
      isAdmin: true, isHAdmin: false, isOrganizer: true,
      createdAt: new Date(),
      pointsAmount: 0,
      verified: true, token: '',
      password_reset_token: '',
      password_reset_token_expiration_date: new Date(),
      updatedAt: new Date()
    },
    {
      id: 0, password: 'password',
      email: 'example@mail.com',
      phone_number: '123456789',
      isAdmin: false, isHAdmin: true, isOrganizer: false,
      createdAt: new Date(),
      pointsAmount: 0,
      verified: true, token: '',
      password_reset_token: '',
      password_reset_token_expiration_date: new Date(),
      updatedAt: new Date()
    }
  ];

  do<ReturnType = void>(restPath: RestPath, options: RestOptions = {}): Observable<ReturnType> {
    switch (restPath) {
      case REST_PATH.CONFIG.GET:
        return this.handleConfig(options);
      case REST_PATH.VERIFICATION.REGISTER:
        return of(null);
      case REST_PATH.VERIFICATION.LOGIN:
        return of({ token: 'token', uid: 1, isOrganizer: false, isAdmin: false, isHAdmin: false } as any);
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
    switch (options.templateParamsValues.key) {
      case CONFIG.fb_link:
        return of('http://www.facebook.pl');
      case CONFIG.price_table:
        return of(RestServiceMock.priceTable);
      case CONFIG.skills:
        return of(RestServiceMock.skills as any);
    }
  }
}
