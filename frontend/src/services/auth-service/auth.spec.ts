import {RestService} from 'services/rest-service/rest.service';
import {AuthService} from './auth.service';
import {restUrls} from 'api/rest-urls';
import {of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {LoginRequest} from 'api/requests/login.dto';
import {ErrorMessageService} from 'services/error-message-service/error.message.service';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';

describe('auth.service', () => {
    let restMock: jasmine.SpyObj<RestService>;
    let service: AuthService;
    let errorMessageServiceMock: jasmine.SpyObj<ErrorMessageService>;
    let translateServiceMock: jasmine.SpyObj<TranslateService>;
    let snackBarMock: jasmine.SpyObj<MatSnackBar>;


    beforeEach(() => {
      errorMessageServiceMock = jasmine.createSpyObj('ErrorMessageService', ['getErrorsStrings']);
      errorMessageServiceMock.getErrorsStrings.and.returnValue(of());

      snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
      snackBarMock.open.and.returnValue(snackBarMock._openedSnackBarRef);

      translateServiceMock = jasmine.createSpyObj('TranslateService', ['get']);
      translateServiceMock.get.and.returnValue(of());

      restMock = jasmine.createSpyObj('RestService', ['do']);
      service = new AuthService(restMock, errorMessageServiceMock, snackBarMock, translateServiceMock);
    });

    it('login via email', (done: DoneFn) => {
        const [email, password] = ['example@mail.com', 'password'];
        const info = { token: 'token', uid: 1 };

        const body: LoginRequest = new LoginRequest();
        body.email = email;
        body.password = password;

        restMock.do.withArgs(restUrls.VERIFICATION.LOGIN, { body }).and.returnValue(of(info));

        service.loginViaEmail(email, password)
        .pipe(
            mergeMap(() => service.sessionInfo$)
        )
        .subscribe(({token, uid}) => {
            expect(token).toEqual(info.token);
            expect(uid).toEqual(info.uid);
            done();
        });
    });

    it('logout', (done: DoneFn) => {
        const [token, uid] = ['token', 1];
        service['sessionInfo'] = {token, uid, isAdmin: false, isHAdmin: false, isOrganizer: false};
        service['sessionInfoSubject'].next(service['sessionInfo']);

        restMock.do.withArgs(restUrls.VERIFICATION.LOGOUT, {templateParamsValues: { token }}).and.returnValue(of(undefined));

        service.logout()
        .pipe(
            mergeMap(() => service.sessionInfo$),
        )
        .subscribe(currentToken => {
            expect(currentToken).toEqual(null);
            done();
        });
    });
});
