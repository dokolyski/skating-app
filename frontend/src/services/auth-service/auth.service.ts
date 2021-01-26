import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {RestService} from 'services/rest-service/rest.service';
import * as REST_PATH from 'api/rest-url.json';
import {LoginRequest} from 'api/requests/login.dto';
import {LoginResponse} from 'api/responses/login.dto';
import {ErrorMessageService} from 'services/error-message-service/error.message.service';

/**
 * @description Authorisation purpose proxy to the ```REST``` server
 */
@Injectable()
export class AuthService {
  private sessionInfo: LoginResponse = null;
  private sessionInfoSubject: BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>(null);
  readonly sessionInfo$: Observable<LoginResponse> = this.sessionInfoSubject.asObservable();

  constructor(
    private rest: RestService,
    private errorMessageService: ErrorMessageService) {
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
    return this.login(this.rest.do<LoginResponse>(REST_PATH.VERIFICATION.LOGIN, {body}));
  }

  /**
   * @description Notify server to logout, clear session info
   * @returns ```Observable```, emits ```next``` on fullfillment
   */
  logout(): Observable<void> {
    return this.rest.do(REST_PATH.VERIFICATION.LOGOUT, {templateParamsValues: {token: this.sessionInfo.token}})
      .pipe(catchError(error => of(this.errorMessageService.handleMessageError(error))),
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
  login(req: Observable<LoginResponse>): Observable<void> {
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
