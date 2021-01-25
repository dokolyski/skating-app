import {map, mergeMap} from 'rxjs/operators';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {RestService} from 'services/rest-service/rest.service';
import {Token} from 'api/rest-models/token';
import * as REST_PATH from 'api/rest-url.json';
import {LoginRequest} from 'api/requests/login.dto';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';

/**
 * @description Authorisation purpose proxy to the ```REST``` server
 */
@Injectable()
export class AuthService {
  private sessionInfo: Token = null;
  private sessionInfoSubject: BehaviorSubject<Token> = new BehaviorSubject<Token>(null);
  readonly sessionInfo$: Observable<Token> = this.sessionInfoSubject.asObservable();

  constructor(
    private rest: RestService,
    private socialAuthService: SocialAuthService) {
    this.restoreSessionInfo();
  }

  /**
   * @returns ```Observable```, emits ```next``` on fullfillment
   */
  loginViaEmail(email: string, password: string): Observable<void> {
    const body: LoginRequest = new LoginRequest();
    body.email = email;
    body.password = password;
    body.provider = 'EMAIL';
    return this.login(this.rest.do<Token>(REST_PATH.VERIFICATION.LOGIN, {body}));
  }

  loginViaGoogle(): Observable<any> {
    return this.loginViaSocialMedia(GoogleLoginProvider.PROVIDER_ID, REST_PATH.VERIFICATION.GOOGLE);
    // TODO - unify google and fb
  }

  /**
   * @returns ```Observable```, emits ```next``` on fullfillment
   */
  loginViaFacebook(): Observable<void> {
    return this.loginViaSocialMedia(FacebookLoginProvider.PROVIDER_ID, REST_PATH.VERIFICATION.GOOGLE);
    // TODO - unify google and fb or change to facebook
  }

  private loginViaSocialMedia(providerID: string, verificationPath: any): Observable<void> {
    this.socialAuthService.signIn(providerID).then();
    return this.login(this.socialAuthService.authState
      .pipe(mergeMap((socialUser) => {
        if (socialUser != null) {
          return this.rest.do<Token>(verificationPath, {body: {user: socialUser}});
        }
      })));
  }

  /**
   * @description Notify server to logout, clear session info
   * @returns ```Observable```, emits ```next``` on fullfillment
   */
  logout(): Observable<void> {
    this.socialAuthService.signOut().then();
    return this.rest.do(REST_PATH.VERIFICATION.LOGOUT, {templateParamsValues: {token: this.sessionInfo.token}})
      .pipe(
        map(() => {
          this.sessionInfo = null;
          this.sessionInfoSubject.next(null);
          localStorage.removeItem('sessionInfo');
        })
      );
  }

  /**
   * @description Send ```body``` to the server,
   * then assign client session information received from server
   * @returns ```Observable```, emits ```next``` on fullfillment
   */
  private login(req: Observable<Token>): Observable<void> {
    return req.pipe(
      map(session => {
        this.sessionInfo = session;
        this.sessionInfoSubject.next(session);
        localStorage.setItem('sessionInfo', JSON.stringify(session));
      })
    );
  }

  /**
   * @description Loads session informations from local storage if exists
   */
  private restoreSessionInfo() {
    this.sessionInfo = JSON.parse(localStorage.getItem('sessionInfo'));
    if (this.sessionInfo) {
      this.sessionInfoSubject.next(this.sessionInfo);
    }
  }
}
