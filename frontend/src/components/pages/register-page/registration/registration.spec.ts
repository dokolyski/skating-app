import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { RestService } from 'services/rest-service/rest.service';
import { RegistrationComponent } from './registration.component';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';

import * as REST_PATH from 'api/rest-url.json';
import { RestError } from 'api/rest-error';
import { moduleInfo } from './registration.module';

import { profileBody, registerBody, skills } from 'assets/mocks/unit-tests/registration-component/config.json';
import { ErrorMessageService, TranslatedErrors } from 'services/error-message-service/error.message.service';
import { TranslateServiceMock } from 'assets/mocks/unit-tests/translation-mocks/translate-service-mock';
import { TranslatePipeMock } from 'assets/mocks/unit-tests/translation-mocks/translate-pipe-mock';
import { TranslateService } from '@ngx-translate/core';

describe('registration.component', () => {
  let restMock: jasmine.SpyObj<RestService>;
  let errorMessageServiceMock: jasmine.SpyObj<ErrorMessageService>;

  let fixture: ComponentFixture<RegistrationComponent>;
  let loader: HarnessLoader;
  let component: RegistrationComponent;

  let buttons: {
    emailInput: MatInputHarness
    passwordInput: MatInputHarness
    repeatPasswdInput: MatInputHarness
    nameInput: MatInputHarness
    lastnameInput: MatInputHarness
    dateBirthInput: MatDatepickerInputHarness
    telephoneNumInput: MatInputHarness
    nextButtons: MatButtonHarness[]
    regButton: MatButtonHarness
    cancelButton: MatButtonHarness
  };

  beforeEach(async (done: DoneFn) => {
    restMock = jasmine.createSpyObj('ResetService', ['do']);
    restMock.do.and.returnValue(of([]));

    errorMessageServiceMock = jasmine.createSpyObj('ErrorMessageService', ['getErrorsStrings']);
    errorMessageServiceMock.getErrorsStrings.and.returnValue(of());

    const module: any = { ...moduleInfo };
    module.providers = [
      { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
      { provide: RestService, useValue: restMock },
      { provide: ErrorMessageService, useValue: errorMessageServiceMock },
      { provide: TranslateService, useClass: TranslateServiceMock }
    ];
    module.declarations = [
      TranslatePipeMock
    ];

    await TestBed.configureTestingModule(module).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;

    done();
  });

  beforeEach(async (done: DoneFn) => {
    buttons = {
      emailInput: await loader.getHarness(MatInputHarness.with({ selector: '#email' })),
      passwordInput: await loader.getHarness(MatInputHarness.with({ selector: '#password' })),
      repeatPasswdInput: await loader.getHarness(MatInputHarness.with({ selector: '#repeatPassword' })),

      nameInput: await loader.getHarness(MatInputHarness.with({ selector: '#name' })),
      lastnameInput: await loader.getHarness(MatInputHarness.with({ selector: '#lastname' })),
      dateBirthInput: await loader.getHarness(MatDatepickerInputHarness.with({ selector: '#dateBirth' })),
      telephoneNumInput: await loader.getHarness(MatInputHarness.with({ selector: '#telephoneNumber' })),

      nextButtons: await loader.getAllHarnesses(MatButtonHarness.with({ selector: 'button.nextButton' })),
      regButton: await loader.getHarness(MatButtonHarness.with({ selector: '#registerButton' })),
      cancelButton: await loader.getHarness(MatButtonHarness.with({ selector: 'button.cancelButton' }))
    };

    done();
  }, 100);

  it('fetch possible skills values', async (done: DoneFn) => {
    const restPath = REST_PATH.CONFIG.GET;
    const options = { templateParamsValues: { key: 'skillLevelPossibleValues' } };

    restMock.do.withArgs(restPath, options).and.returnValue(new Observable<any>(s => {
      expect().nothing();
      done();
    }));

    component.ngOnInit();
  });

  it('emits error on fetch skills when server responds with error which contains generalized message', async (done: DoneFn) => {
    const messageToken = 'SERVER_ERROR';
    const message = 'Server error.';

    restMock.do.and.returnValue(new Observable<any>(s => s.error({ messageToken })));
    errorMessageServiceMock.getErrorsStrings.withArgs({ messageToken }).and.returnValue(of({ message }));

    component.onError.subscribe(msg => {
      expect(msg).toEqual(message);
      done();
    });

    component.ngOnInit();
  });

  it('cancels registration when user clicked cancel button', async (done: DoneFn) => {
    component.onCancel.subscribe(() => {
      expect().nothing();
      done();
    });

    component.ngOnInit();
    buttons.cancelButton.click();
  });

  it('submits registration when user pass all phases without errors', async (done: DoneFn) => {
    const templateParamsValues = { key: 'skillLevelPossibleValues' };
    const regBodyInput = { ...registerBody, birth_date: new Date(registerBody.birth_date) };

    restMock.do.withArgs(REST_PATH.CONFIG.GET, { templateParamsValues }).and.returnValue(of([profileBody.skill_level]));
    restMock.do.withArgs(REST_PATH.VERIFICATION.REGISTER, { body: regBodyInput }).and.returnValue(of());
    restMock.do.withArgs(REST_PATH.PROFILES.EDIT, { body: profileBody }).and.returnValue(of());

    component.onSubmit.subscribe(() => {
      const errorInfos = fixture.debugElement.queryAll(By.css('mat-error'));
      expect(errorInfos.length).toEqual(0);
      done();
    });

    component.ngOnInit();

    await buttons.emailInput.setValue(registerBody.email);
    await buttons.passwordInput.setValue(registerBody.password);
    await buttons.repeatPasswdInput.setValue(registerBody.password);
    await buttons.nextButtons[0].click();

    await buttons.nameInput.setValue(profileBody.fistname);
    await buttons.lastnameInput.setValue(profileBody.lastname);
    await buttons.dateBirthInput.setValue(profileBody.birth_date);
    await buttons.telephoneNumInput.setValue(registerBody.phone_number);
    await buttons.nextButtons[1].click();

    await buttons.regButton.click();
  });

  it('shows client-side errors on invalid inputs values', async (done: DoneFn) => {
    const anotherPasswd = '4123';
    expect(anotherPasswd).not.toEqual(registerBody.password);

    component.ngOnInit();

    await buttons.passwordInput.setValue(registerBody.password);
    await buttons.repeatPasswdInput.setValue(anotherPasswd);
    await buttons.nextButtons[0].click();

    const errInfo = fixture.debugElement.queryAll(By.css('mat-error'));
    expect(errInfo.map(e => e.nativeElement.innerHTML.length > 0).some(Boolean)).toBeTruthy();
    expect(component.form.get('base.repeatPassword').hasError('not-equals')).toBeTruthy();
    done();
  });

  it('shows server-side errors on invalid inputs values \
    when server responds with error which contains inputs messages', async (done: DoneFn) => {
    const [controlId, errKey, errToken, errTrans] = ['base.email', 'email', 'INV_EMAIL', 'Invalid email'];
    const error: RestError = {
      inputsTokens: { [errKey]: errToken }
    };
    const translatedErr: TranslatedErrors = {
      inputs: { [errKey]: errTrans }
    };
    const options = { templateParamsValues: { key: 'skillLevelPossibleValues' } };

    const body: any = registerBody;
    body.birth_date = new Date(body.birth_date);

    restMock.do.withArgs(REST_PATH.CONFIG.GET, options).and.returnValue(of(skills));
    restMock.do.and.returnValue(new Observable(s => s.error(error)));
    errorMessageServiceMock.getErrorsStrings.and.returnValue(of(translatedErr));

    component.ngOnInit();

    await buttons.emailInput.setValue(registerBody.email);
    await buttons.passwordInput.setValue(registerBody.password);
    await buttons.repeatPasswdInput.setValue(registerBody.password);
    await buttons.nextButtons[0].click();

    await buttons.nameInput.setValue(profileBody.fistname);
    await buttons.lastnameInput.setValue(profileBody.lastname);
    await buttons.dateBirthInput.setValue(profileBody.birth_date);
    await buttons.telephoneNumInput.setValue(registerBody.phone_number);
    await buttons.nextButtons[1].click();

    await buttons.regButton.click();

    await fixture.whenStable();

    const control = component.form.get(controlId);
    expect(control.hasError('server-error')).toBeTruthy();

    let counter = 0;
    const transErrors = Object.values(translatedErr.inputs);
    const errorInfos = fixture.debugElement.queryAll(By.css('mat-error'));

    for (const err of errorInfos) {
      const search = transErrors.findIndex(inputErr => inputErr === err.nativeElement.innerHTML.trim());
      if (search > -1) {
        delete transErrors[search];
        counter++;
      }
    }
    expect(counter).toEqual(transErrors.length);
    done();
  });
});
