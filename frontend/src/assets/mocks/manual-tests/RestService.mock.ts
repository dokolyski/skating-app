import { Observable, of } from 'rxjs';
import { RestOptions, RestPath } from 'services/rest-service/rest.service';
import { restUrls } from '../../../api/rest-urls';
import { Injectable } from '@angular/core';
import { ProfileResponse } from 'api/responses/profile.dto';
import { UserResponse } from 'api/responses/user.dto';
import {restConfig} from 'assets/config/rest-config';
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

  private static handleConfig(options) {
    switch (options.templateParamsValues.key) {
      case restConfig.fb_link:
        return of('http://www.facebook.pl');
      case restConfig.price_table:
        return of(RestServiceMock.priceTable);
      case restConfig.skills:
        return of(RestServiceMock.skills as any);
    }
  }

  do<ReturnType = void>(restPath: RestPath, options: RestOptions = {}): Observable<ReturnType> {
    switch (restPath) {
      case restUrls.CONFIG.GET:
        return RestServiceMock.handleConfig(options);
      case restUrls.VERIFICATION.REGISTER:
        return of(null);
      case restUrls.VERIFICATION.LOGIN:
        return of({ token: 'token', uid: 1, isOrganizer: false, isAdmin: false, isHAdmin: false } as any);
      case restUrls.VERIFICATION.LOGOUT:
        return of(null);
      case restUrls.PROFILES.EDIT:
        return of(null);
      case restUrls.PROFILES.GET:
        return of(RestServiceMock.profiles as any);
      case restUrls.SESSIONS.GET_SESSIONS:
        return of(RestServiceMock.sessions as any);
      case restUrls.NOTIFICATIONS.GET_NOTIFICATIONS:
        return of(RestServiceMock.notifications as any);
      case restUrls.USERS.GET:
        return of(RestServiceMock.userInfo as any);
      case restUrls.USERS.ALL:
        return of(RestServiceMock.allUsers as any);
    }
  }
}
