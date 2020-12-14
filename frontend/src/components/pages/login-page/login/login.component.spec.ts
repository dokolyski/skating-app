import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { By } from "@angular/platform-browser"
import { AuthService } from 'services/auth-service/Auth.service';
import { LanguageErrorService, TranslatedErrors } from 'services/languageError-service/LanguageError.service';
import { RestService } from 'services/rest-service/Rest.service';

import { LoginComponent } from './login.component';
import { moduleInfo } from './login.module';
import { LanguageService } from 'services/language-service/Language.service';
import { Observable, of } from 'rxjs';

import { translation, user } from 'assets/mocks/unit-tests/login-component/config.json'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestError } from 'api/rest-error';

describe('login.component', () => {
  let authMock: jasmine.SpyObj<AuthService>
  let restMock: jasmine.SpyObj<RestService>
  let lngMock: jasmine.SpyObj<LanguageService>
  let lngErrorMock: jasmine.SpyObj<LanguageErrorService>
  
  let loader: HarnessLoader
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  let buttons: {
    emailInput: MatInputHarness
    passwordInput: MatInputHarness
    loginViaEmail: MatButtonHarness
    loginViaGoogle: MatButtonHarness
    loginViaFacebook: MatButtonHarness
  }

  beforeEach(async (done: DoneFn) => {
    const methods = ['loginViaEmail', 'loginViaGoogle', 'loginViaFacebook']
    authMock = jasmine.createSpyObj('AuthService', methods)

    restMock = jasmine.createSpyObj('ResetService', ['do'])

    lngMock = jasmine.createSpyObj('LanguageService', [], {'dictionary$': of(translation)})

    lngErrorMock = jasmine.createSpyObj('LanguageErrorService', ['getErrorsStrings'])

    const module: any = moduleInfo
    module.imports = [
      ...module.imports,
      BrowserAnimationsModule,
      MatIconTestingModule
    ]
    module.providers = [
      { provide: AuthService, useValue: authMock },
      { provide: RestService, useValue: restMock },
      { provide: LanguageService, useValue: lngMock },
      { provide: LanguageErrorService, useValue: lngErrorMock }
    ]

    await TestBed.configureTestingModule(module).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;

    done()
  });

  beforeEach(async (done: DoneFn) => {
    buttons = {
      emailInput: await loader.getHarness(MatInputHarness.with({ selector: '#email' })),
      passwordInput: await loader.getHarness(MatInputHarness.with({ selector: '#password' })),
      loginViaEmail: await loader.getHarness(MatButtonHarness.with({ selector: '#loginEmail' })),
      loginViaGoogle: await loader.getHarness(MatButtonHarness.with({ selector: '#loginGoogle' })),
      loginViaFacebook: await loader.getHarness(MatButtonHarness.with({ selector: '#loginFacebook' }))
    }

    done()
  }, 100)

  it('login via email', async (done: DoneFn) => {
    authMock.loginViaEmail.withArgs(user.email, user.password).and.returnValue(of())
    component.onSubmit.subscribe(() => {
      expect().nothing()
      done()
    })

    await buttons.emailInput.setValue(user.email)
    await buttons.passwordInput.setValue(user.password)
    await buttons.loginViaEmail.click()
  })

  it('login via google', async (done: DoneFn) => {
    authMock.loginViaGoogle.withArgs().and.returnValue(of())
    component.onSubmit.subscribe(() => {
      expect().nothing()
      done()
    })

    await buttons.loginViaGoogle.click()
  })

  it('login via facebook', async (done: DoneFn) => {
    authMock.loginViaFacebook.withArgs().and.returnValue(of())
    component.onSubmit.subscribe(() => {
      expect().nothing()
      done()
    })

    await buttons.loginViaFacebook.click()
  })

  it('shows client-side errors on invalid inputs values', async (done: DoneFn) => {
    await buttons.loginViaEmail.click()

    const errInfo = fixture.debugElement.queryAll(By.css('mat-error'))
    expect(errInfo.length).toBeGreaterThan(0)
    expect(component.form.get('email').hasError('required')).toBeTruthy()
    expect(component.form.get('password').hasError('required')).toBeTruthy()
    done()
  })

  it('shows server-side errors on invalid inputs values when server responds with error which contains inputs messages', async (done: DoneFn) => {
    const [controlId, errKey, errToken, errTrans] = ['email', 'email', 'INV_EMAIL', 'Invalid email']
    const error: RestError = {
      inputsTokens: { [errKey]: errToken }
    }
    const translatedErr: TranslatedErrors = {
      inputs: { [errKey]: errTrans }
    }
    authMock.loginViaEmail.withArgs(user.email, user.password).and.returnValue(new Observable<void>(s => s.error(error)))
    lngErrorMock.getErrorsStrings.withArgs(error).and.returnValue(of(translatedErr))

    await buttons.emailInput.setValue(user.email)
    await buttons.passwordInput.setValue(user.password)
    await buttons.loginViaEmail.click()

    await fixture.whenStable()
    
    const errInfo = fixture.debugElement.queryAll(By.css('mat-error'))
    expect(errInfo.map(e => e.nativeElement.innerHTML.trim() == errTrans).some(Boolean)).toBeTruthy()
    expect(component.form.get(controlId).hasError('server-error')).toBeTruthy()
    done()
  })
});
