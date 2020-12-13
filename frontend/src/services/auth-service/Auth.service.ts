import { map, mergeMap } from "rxjs/operators";
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from "angularx-social-login";
import { RestService } from 'services/rest-service/Rest.service';
import { VERIFICATION } from 'api/rest-types'
import * as REST_PATH from 'api/rest-url.json'
import { CookieService } from "ngx-cookie-service";

type Token = VERIFICATION.LOGIN.Token
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: Token = null
  private tokenSubject: BehaviorSubject<Token> = new BehaviorSubject<Token>(this.token)
  readonly token$: Observable<Token> = this.tokenSubject.asObservable()

  constructor(
    private rest: RestService,
    private tokenService: SocialAuthService,
    private cookieService: CookieService) {}

  loginViaEmail(email: string, password: string): Observable<void> {
    const body = { email, password }
    return this.rest.do(REST_PATH.VERIFICATION.LOGIN, { body })
  }

  loginViaGoogle(): Observable<void> {
    return this.loginViaSocialMedia(GoogleLoginProvider.PROVIDER_ID, 'GOOGLE')
  }

  loginViaFacebook(): Observable<void> {
    return this.loginViaSocialMedia(FacebookLoginProvider.PROVIDER_ID, 'FACEBOOK')
  }

  logout(): Observable<void> {
    return this.rest.do(REST_PATH.VERIFICATION.LOGOUT, { templateParamsValues: { token: this.token } })
    .pipe(
      map(() => {
        this.token = null
        this.tokenSubject.next(null)
      })
    )
  }

  get uid() {
    return this.cookieService.get('uid')
  }

  private loginViaSocialMedia(providerId: string, providerName: string): Observable<void> {
    return from(this.tokenService.signIn(providerId))
    .pipe(
      map((v: SocialUser) => ({ token: v.idToken, provider: providerName })),
      mergeMap(body => this.rest.do<Token>(REST_PATH.VERIFICATION.LOGIN, { body })),
      map(token => {
        this.token = token
        this.tokenSubject.next(token)
      })
    )
  }

}