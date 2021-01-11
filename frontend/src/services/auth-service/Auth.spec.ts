import { RestService } from 'services/rest-service/Rest.service';
import { AuthService } from './Auth.service';
import * as REST_PATH from 'api/rest-url.json';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {LoginRequest} from 'api/requests/login.dto';

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

        const body: LoginRequest = new LoginRequest();
        body.email = email;
        body.password = password;

        restMock.do.withArgs(REST_PATH.VERIFICATION.LOGIN, { body }).and.returnValue(of(info));

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

    it('login via google', (done: DoneFn) => {
        const info = { token: 'token', uid: 1 };

        const body: LoginRequest = new LoginRequest();
        body.provider = 'GOOGLE';

        restMock.do.withArgs(REST_PATH.VERIFICATION.LOGIN, { body }).and.returnValue(of(info));

        service.loginViaGoogle()
        .pipe(
            mergeMap(() => service.sessionInfo$),
        )
        .subscribe(({token, uid}) => {
            expect(token).toEqual(info.token);
            expect(uid).toEqual(info.uid);
            done();
        });
    });

    it('login via facebook', (done: DoneFn) => {
        const info = { token: 'token', uid: 1 };

        const body: LoginRequest = new LoginRequest();
        body.provider = 'FACEBOOK';

        restMock.do.withArgs(REST_PATH.VERIFICATION.LOGIN, { body }).and.returnValue(of(info));

        service.loginViaFacebook()
        .pipe(
            mergeMap(() => service.sessionInfo$),
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

        restMock.do.withArgs(REST_PATH.VERIFICATION.LOGOUT, {templateParamsValues: { token }}).and.returnValue(of(undefined));

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
