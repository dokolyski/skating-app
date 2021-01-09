import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RestService } from 'services/rest-service/Rest.service';
import * as REST_PATH from 'api/rest-url.json';
import { Token } from 'api/rest-models/token';
import { VERIFICATION } from 'api/rest-types';
import { LoginInfo } from 'api/rest-models/login-info';

/**
 * @description Authorisation purpose proxy to the ```REST``` server and ```Token provider```
 */
@Injectable()
export class AuthService {
  private sessionInfo: Token = null;
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private uidSubject: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  readonly token$: Observable<string> = this.tokenSubject.asObservable();
  readonly uid$: Observable<number> = this.uidSubject.asObservable();

  constructor(
    private rest: RestService) {
      this.sessionInfo = JSON.parse(localStorage.getItem('token'));
      if(this.sessionInfo) {
        this.tokenSubject.next(this.sessionInfo.token);
        this.uidSubject.next(this.sessionInfo.uid);
      }
    }

 /**
  * @returns ```Observable```, emits ```next``` on fullfillment
  */
  loginViaEmail(email: string, password: string): Observable<void> {
    const body: VERIFICATION.LOGIN.INPUT = new LoginInfo();
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
  * @description Notify server to logout, clear token
  * @returns ```Observable```, emits ```next``` on fullfillment
  */
  logout(): Observable<void> {
    return this.rest.do(REST_PATH.VERIFICATION.LOGOUT, { templateParamsValues: { token: this.sessionInfo.token } })
    .pipe(
      map(() => {
        this.sessionInfo = null;
        this.tokenSubject.next(null);
        localStorage.removeItem('token');
      })
    );
  }

 /**
  * @description Send ```provider name``` to the server
  * @returns ```Observable```, emits ```next``` on fullfillment
  */
  private loginViaSocialMedia(providerName: string): Observable<void> {
    const body: VERIFICATION.LOGIN.INPUT = new LoginInfo();
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
        this.tokenSubject.next(session.token);
        this.uidSubject.next(session.uid);
        localStorage.setItem('token', JSON.stringify(session));
      })
    );
  }
}
