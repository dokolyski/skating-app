import { map } from "rxjs/operators";
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RestService } from 'services/rest-service/Rest.service';
import * as REST_PATH from 'api/rest-url.json'
import * as REST_TYPE from 'api/rest-types'
import { CookieService } from "ngx-cookie-service";
import { Token } from "api/rest-models/token";

/**
 * @description Authorisation purpose proxy to the ```REST``` server and ```Token provider```
 */
@Injectable()
export class AuthService {
  private token: Token = null
  private tokenSubject: BehaviorSubject<Token> = new BehaviorSubject<Token>(this.token)
  readonly token$: Observable<Token> = this.tokenSubject.asObservable()

  constructor(
    private rest: RestService,
    private cookieService: CookieService) {}

  /**
  * @returns ```Observable```, emits ```next``` on fullfillment
  */
  loginViaEmail(email: string, password: string): Observable<void> {
    const body: REST_TYPE.VERIFICATION.LOGIN.INPUT = { email, password } as any
    return this.rest.do(REST_PATH.VERIFICATION.LOGIN, { body })
  }

  /**
  * @returns ```Observable```, emits ```next``` on fullfillment
  */
  loginViaGoogle(): Observable<void> {
    return this.loginViaSocialMedia('GOOGLE')
  }

  /**
  * @returns ```Observable```, emits ```next``` on fullfillment
  */
  loginViaFacebook(): Observable<void> {
    return this.loginViaSocialMedia('FACEBOOK')
  }

  /**
  * @description Notify server to logout, clear token
  * @returns ```Observable```, emits ```next``` on fullfillment
  */
  logout(): Observable<void> {
    return this.rest.do(REST_PATH.VERIFICATION.LOGOUT, { templateParamsValues: { token: this.token } })
    .pipe(
      map(() => {
        this.token = null
        this.tokenSubject.next(null)
      })
    )
  }

  /**
  * @returns Server user id
  */
  get uid() {
    return this.cookieService.get('uid')
  }

  /**
  * @description Sign in to provider, then send ```token``` and ```provider name``` to the server, finally assign client token received from server
  * @returns ```Observable```, emits ```next``` on fullfillment
  */
  private loginViaSocialMedia(providerName: string): Observable<void> {
    const body = {  }
    return this.rest.do<Token>(REST_PATH.VERIFICATION.LOGIN, { body })
    .pipe(
      map(token => {
        this.token = token
        this.tokenSubject.next(token)
      })
    )
  }

}