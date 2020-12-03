import { RestService } from "services/rest-service/Rest.service"
import { AuthService } from "./Auth.service"
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from "angularx-social-login"
import * as REST_PATH from 'api/rest-url.json'
import { of } from "rxjs"
import { mergeMap } from "rxjs/operators"

describe('auth.service', () => {
    let restMock: jasmine.SpyObj<RestService>
    let socialMock: jasmine.SpyObj<SocialAuthService>
    let service: AuthService
    
    beforeEach(() => {
        restMock = jasmine.createSpyObj('RestService', ['do'])
        socialMock = jasmine.createSpyObj('SocialAuthService', ['signIn'])

        service = new AuthService(restMock, socialMock)
    })

    it('login via email', (done: DoneFn) => {
        const [email, password] = ['example@mail.com', 'password']
        restMock.do.withArgs(REST_PATH.VERIFICATION.LOGIN, { body: { email, password } }).and.returnValue(of(undefined))

        service.loginViaEmail(email, password)
        .subscribe(() => {
            expect().nothing()
            done()
        })
    })

    it('login via google', (done: DoneFn) => {
        const user = {idToken: 'idToken'} as SocialUser
        const token = user.idToken
        const provider = 'GOOGLE'
        const serverToken = 'serverToken'
        socialMock.signIn.withArgs(GoogleLoginProvider.PROVIDER_ID).and.returnValue(of(user).toPromise())
        restMock.do.withArgs(REST_PATH.VERIFICATION.LOGIN, { body: { token, provider } }).and.returnValue(of(serverToken))

        service.loginViaGoogle()
        .pipe(
            mergeMap(() => service.token$)
        )
        .subscribe(token => {
            expect(token).toEqual(serverToken)
            done()
        })
    })

    it('login via facebook', (done: DoneFn) => {
        const user = {idToken: 'idToken'} as SocialUser
        const token = user.idToken
        const provider = 'FACEBOOK'
        const serverToken = 'serverToken'
        socialMock.signIn.withArgs(FacebookLoginProvider.PROVIDER_ID).and.returnValue(of(user).toPromise())
        restMock.do.withArgs(REST_PATH.VERIFICATION.LOGIN, { body: { token, provider } }).and.returnValue(of(serverToken))

        service.loginViaFacebook()
        .pipe(
            mergeMap(() => service.token$)
        )
        .subscribe(token => {
            expect(token).toEqual(serverToken)
            done()
        })
    })

    it('logout', (done: DoneFn) => {
        const initToken = 'token'
        service['token'] = initToken

        const token = initToken
        restMock.do.withArgs(REST_PATH.VERIFICATION.LOGOUT, {templateParamsValues: {token}}).and.returnValue(of(undefined))
        service.logout()
        .pipe(
            mergeMap(() => service.token$)
        )
        .subscribe(token => {
            expect(token).toEqual(null)
            done()
        })
    })
})