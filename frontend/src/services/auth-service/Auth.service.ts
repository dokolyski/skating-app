import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RestService } from 'services/rest-service/Rest.service';
import * as REST_PATH from 'api/rest-url.json';
import { Token } from 'api/rest-models/token';
import {LoginRequest} from 'api/requests/login.dto';

/**
 * @description Authorisation purpose proxy to the ```REST``` server
 */
@Injectable()
export class AuthService {
  private sessionInfo: Token = null;
  private sessionInfoSubject: BehaviorSubject<Token> = new BehaviorSubject<Token>(null);
  readonly sessionInfo$: Observable<Token> = this.sessionInfoSubject.asObservable();

  constructor(
    private rest: RestService) {
      this.sessionInfo = JSON.parse(localStorage.getItem('sessionInfo'));
      if(this.sessionInfo) {
        this.sessionInfoSubject.next(this.sessionInfo);
      }
    }

 /**
  * @returns ```Observable```, emits ```next``` on fullfillment
  */
  loginViaEmail(email: string, password: string): Observable<void> {
    const body: LoginRequest = new LoginRequest();
    body.email = email;
    body.password = password;

    return this.login(body);
  }

 /**
  * @returns ```Observable```, emits ```next``` on fullfillment
  */
  loginViaGoogle(): Observable<void> {
    return this.loginViaSocialMedia('GOOGLE');
  }

 /**
  * @returns ```Observable```, emits ```next``` on fullfillment
  */
  loginViaFacebook(): Observable<void> {
    return this.loginViaSocialMedia('FACEBOOK');
  }

 /**
  * @description Notify server to logout, clear session info
  * @returns ```Observable```, emits ```next``` on fullfillment
  */
  logout(): Observable<void> {
    return this.rest.do(REST_PATH.VERIFICATION.LOGOUT, { templateParamsValues: { token: this.sessionInfo.token } })
    .pipe(
      map(() => {
        this.sessionInfo = null;
        this.sessionInfoSubject.next(null);
        localStorage.removeItem('sessionInfo');
      })
    );
  }

 /**
  * @description Send ```provider name``` to the server
  * @returns ```Observable```, emits ```next``` on fullfillment
  */
  private loginViaSocialMedia(providerName: string): Observable<void> {
    const body: LoginRequest = new LoginRequest();
    body.provider = providerName;

    return this.login(body);
  }

 /**
  * @description Send ```body``` to the server,
  * then assign client session information received from server
  * @returns ```Observable```, emits ```next``` on fullfillment
  */
  private login(body): Observable<void> {
    return this.rest.do<Token>(REST_PATH.VERIFICATION.LOGIN, { body })
    .pipe(
      map(session => {
        this.sessionInfo = session;
        this.sessionInfoSubject.next(session);
        localStorage.setItem('sessionInfo', JSON.stringify(session));
      })
    );
  }
}
