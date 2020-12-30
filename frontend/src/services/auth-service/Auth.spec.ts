import { RestService } from 'services/rest-service/Rest.service';
import { AuthService } from './Auth.service';
import * as REST_PATH from 'api/rest-url.json';
import { of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { VERIFICATION } from 'api/rest-types';
import { LoginInfo } from 'api/rest-models/login-info';

describe('auth.service', () => {
    let restMock: jasmine.SpyObj<RestService>;
    let service: AuthService;

    beforeEach(() => {
        restMock = jasmine.createSpyObj('RestService', ['do']);
        service = new AuthService(restMock);
    });

    it('login via email', (done: DoneFn) => {
        const [email, password] = ['example@mail.com', 'password'];
        const info = { token: 'token', uid: 1 };

        const body: VERIFICATION.LOGIN.INPUT = new LoginInfo();
        body.email = email;
        body.password = password;

        restMock.do.withArgs(REST_PATH.VERIFICATION.LOGIN, { body }).and.returnValue(of(info));

        service.loginViaEmail(email, password)
        .pipe(
            mergeMap(() => service.token$),
            tap(token => expect(token).toEqual(info.token)),
            mergeMap(() => service.uid$)
        )
        .subscribe(uid => {
            expect(uid).toEqual(info.uid);
            done();
        });
    });

    it('login via google', (done: DoneFn) => {
        const info = { token: 'token', uid: 1 };

        const body: VERIFICATION.LOGIN.INPUT = new LoginInfo();
        body.provider = 'GOOGLE';

        restMock.do.withArgs(REST_PATH.VERIFICATION.LOGIN, { body }).and.returnValue(of(info));

        service.loginViaGoogle()
        .pipe(
            mergeMap(() => service.token$),
            tap(token => expect(token).toEqual(info.token)),
            mergeMap(() => service.uid$)
        )
        .subscribe(uid => {
            expect(uid).toEqual(info.uid);
            done();
        });
    });

    it('login via facebook', (done: DoneFn) => {
        const info = { token: 'token', uid: 1 };

        const body: VERIFICATION.LOGIN.INPUT = new LoginInfo();
        body.provider = 'FACEBOOK';

        restMock.do.withArgs(REST_PATH.VERIFICATION.LOGIN, { body }).and.returnValue(of(info));

        service.loginViaFacebook()
        .pipe(
            mergeMap(() => service.token$),
            tap(token => expect(token).toEqual(info.token)),
            mergeMap(() => service.uid$)
        )
        .subscribe(uid => {
            expect(uid).toEqual(info.uid);
            done();
        });
    });

    it('logout', (done: DoneFn) => {
        const [token, uid] = ['token', 1];
        service['sessionInfo'] = {token, uid};
        service['tokenSubject'].next(token);
        service['uidSubject'].next(uid);

        restMock.do.withArgs(REST_PATH.VERIFICATION.LOGOUT, {templateParamsValues: { token }}).and.returnValue(of(undefined));

        service.logout()
        .pipe(
            mergeMap(() => service.token$),
        )
        .subscribe(currentToken => {
            expect(currentToken).toEqual(null);
            done();
        });
    });
});
