import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper"
import { CommonModule } from "@angular/common"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { FormBuilder, ReactiveFormsModule } from "@angular/forms"
import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSelectModule } from "@angular/material/select"
import { MatStepperModule } from "@angular/material/stepper"
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { By } from "@angular/platform-browser"
import { asyncScheduler, Observable, of, scheduled } from "rxjs"
import { LanguageErrorService, TranslatedErrors } from "services/languageError-service/LanguageError.service"
import { RestService } from "services/rest-service/Rest.service"
import { RegistrationComponent } from "./registration.component"

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';

import * as REST_PATH from 'api/rest-url.json'
import { RestError } from "api/rest-error"

describe('registration.component', () => {
    let fixture: ComponentFixture<RegistrationComponent>
    let loader: HarnessLoader
    let component: RegistrationComponent

    const skills = ['skill_1', 'skill_2', 'skill_3']
    const registerBody = {
        fistname: 'Name',
        lastname: 'Lastname',
        email: 'example@mail.com', 
        password: 'P@ssw0rd1234',
        birth_date: '1/1/1990',
        phone_number: '+48 123 456 789'
    }
    const profileBody = {
        fistname: registerBody.fistname,
        lastname: registerBody.lastname,
        birth_date: registerBody.birth_date,
        skill_level: 'skill_1'
    }

    async function init({restMock = null, lngErrorMock = null}) {
        if(!restMock) {
            restMock = jasmine.createSpyObj('ResetService', ['do'])
            restMock.do.and.returnValue(of([]))
        }

        if(!lngErrorMock) {
            lngErrorMock = jasmine.createSpyObj('LanguageErrorService', ['getErrorsStrings'])
            lngErrorMock.getErrorsStrings.and.returnValue(of({}))
        }

        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                BrowserAnimationsModule,
                MatStepperModule,
                MatSelectModule,
                MatCardModule,
                MatFormFieldModule,
                MatButtonModule,
                MatIconModule,
                MatInputModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatProgressSpinnerModule,
                ReactiveFormsModule
            ],
            declarations: [RegistrationComponent],
            providers: [
                MatDatepickerModule,
                FormBuilder,
                { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
                { provide: RestService, useValue: restMock },
                { provide: LanguageErrorService, useValue: lngErrorMock }
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(RegistrationComponent)
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance
    }

    async function getButtons() {
        return {
            emailInput: await loader.getHarness(MatInputHarness.with({selector: '#email'})),
            passwordInput: await loader.getHarness(MatInputHarness.with({selector: '#password'})),
            repeatPasswdInput: await loader.getHarness(MatInputHarness.with({selector: '#repeatPassword'})),
            
            nameInput: await loader.getHarness(MatInputHarness.with({selector: '#name'})),
            lastnameInput: await loader.getHarness(MatInputHarness.with({selector: '#lastname'})),
            dateBirthInput: await loader.getHarness(MatDatepickerInputHarness.with({selector: '#dateBirth'})),
            telephoneNumInput: await loader.getHarness(MatInputHarness.with({selector: '#telephoneNumber'})),
            
            nextButtons: await loader.getAllHarnesses(MatButtonHarness.with({selector: 'button.nextButton'})),
            regButton: await loader.getHarness(MatButtonHarness.with({selector: '#registerButton'})),
            cancelButton: await loader.getHarness(MatButtonHarness.with({selector: 'button.cancelButton'}))
        }
    }

    it('fetch possible skills values', async (done: DoneFn) => {
        const restMock = jasmine.createSpyObj('RestService', ['do'])
        restMock.do.and.returnValue(new Observable<any>(s => s.next(skills)))

        await init({restMock})
        
        scheduled([component.onStartWaiting, component.onStopWaiting], asyncScheduler)
        .subscribe(() => {
            expect(restMock.do).toHaveBeenCalled()
            expect(component.skillLevelPossibleValues).toEqual(skills)
            done()
        })

        component.ngOnInit()
    })

    it('emits error on fetch skills when server responds with error which contains generalized message', async (done: DoneFn) => {
        const messageToken = 'SERVER_ERROR'
        const message = 'Server error.'

        const restMock = jasmine.createSpyObj('RestService', ['do'])
        restMock.do.and.returnValue(new Observable<any>(s => s.error({ messageToken })))

        const lngErrorMock = jasmine.createSpyObj('LanguageErrorService', ['getErrorsStrings'])
        lngErrorMock.getErrorsStrings.and.returnValue(of({ message }))

        await init({restMock, lngErrorMock})
        component.onError.subscribe(msg => {
            expect(restMock.do).toHaveBeenCalled()
            expect(lngErrorMock.getErrorsStrings).toHaveBeenCalledWith({ messageToken })
            expect(msg).toEqual(message)
            done()
        })
        
        component.ngOnInit()
    })

    it('cancels registration when user clicked cancel button', async (done: DoneFn) => {
        await init({})
        fixture.detectChanges()
        component.onCancel.subscribe(() => {
            expect().nothing()
            done()
        })

        const buttons = await getButtons()
        buttons.cancelButton.click()
    })

    it('submits registration when user pass all phases without errors', async (done: DoneFn) => {
        const restMock = jasmine.createSpyObj('RestService', ['do'])
        restMock.do.and.callFake((path, { body }) => {
            switch(path) {
                case REST_PATH.CONFIG.GET:  
                    return of([profileBody.skill_level])
                case REST_PATH.VERIFICATION.REGISTER:
                    expect(body.birth_date).toEqual(new Date(registerBody.birth_date))
                    const cp = {...registerBody}
                    delete body.birth_date 
                    delete cp.birth_date
                    expect(body).toEqual(cp)
                    return of(null)
                case REST_PATH.PROFILES.EDIT: 
                    expect(body).toEqual(profileBody)
                    return of(null)
            }
        })
        
        await init({restMock})
        
        component.onSubmit.subscribe(() => {
            const errorInfos = fixture.debugElement.queryAll(By.css('mat-error'))
            errorInfos.forEach(e => expect(e.nativeElement.innerHTML).toEqual(''))
            done()
        })
        
        const buttons = await getButtons()

        await buttons.emailInput.setValue(registerBody.email)
        await buttons.passwordInput.setValue(registerBody.password)
        await buttons.repeatPasswdInput.setValue(registerBody.password)
        await buttons.nextButtons[0].click()

        await buttons.nameInput.setValue(profileBody.fistname)
        await buttons.lastnameInput.setValue(profileBody.lastname)
        await buttons.dateBirthInput.setValue(profileBody.birth_date)
        await buttons.telephoneNumInput.setValue(registerBody.phone_number)
        await buttons.nextButtons[1].click()
        
        await buttons.regButton.click()
    })

    it('shows client-side errors on invalid inputs values', async (done: DoneFn) => {
        const anotherPasswd = '4123'
        expect(anotherPasswd).not.toEqual(registerBody.password)

        await init({})

        const buttons = await getButtons()

        await buttons.passwordInput.setValue(registerBody.password)
        await buttons.repeatPasswdInput.setValue(anotherPasswd)
        await buttons.nextButtons[0].click()

        const errInfo = fixture.debugElement.queryAll(By.css('mat-error'))
        expect(errInfo.map(e => e.nativeElement.innerHTML.length > 0).some(Boolean)).toBeTruthy()
        expect(component.form.get('base.repeatPassword').hasError('not-equals'))
        done()
    })

    it('shows server-side errors on invalid inputs values when server responds with error which contains inputs messages', async (done: DoneFn) => {
        const [errKey, errToken, errTrans] = ['base.email', 'INV_EMAIL', 'Invalid email']
        const error: RestError = { 
            inputsTokens: { [errKey]: errToken } 
        }
        const restMock = jasmine.createSpyObj('RestService', ['do'])
        restMock.do.and.callFake((path, { body }) => {
            if(path == REST_PATH.VERIFICATION.REGISTER) {
                return new Observable(s => s.error(error))
            } else {
                return of(skills)
            }
        })
        
        const translatedErr: TranslatedErrors = { 
            inputs: {  [errKey]: errTrans } 
        }
        const lngErrorMock = jasmine.createSpyObj('LanguageErrorService', ['getErrorsStrings'])
        lngErrorMock.getErrorsStrings.and.returnValue(of(translatedErr))

        await init({restMock, lngErrorMock})
        const buttons = await getButtons()
        
        await buttons.emailInput.setValue(registerBody.email)
        await buttons.passwordInput.setValue(registerBody.password)
        await buttons.repeatPasswdInput.setValue(registerBody.password)
        await buttons.nextButtons[0].click()

        await buttons.nameInput.setValue(profileBody.fistname)
        await buttons.lastnameInput.setValue(profileBody.lastname)
        await buttons.dateBirthInput.setValue(profileBody.birth_date)
        await buttons.telephoneNumInput.setValue(registerBody.phone_number)
        await buttons.nextButtons[1].click()
        
        await buttons.regButton.click()

        setTimeout(() => {
            const control = component.form.get(errKey)
            expect(control.hasError('server-error')).toBeTruthy()
            
            let counter = 0
            const transErrors = Object.values(translatedErr.inputs)
            const errorInfos = fixture.debugElement.queryAll(By.css('mat-error'))

            for(const err of errorInfos) {
                const search = transErrors.findIndex(inputErr => inputErr == err.nativeElement.outerText)
                if(search > -1) {
                    delete transErrors[search]
                    counter++
                }
            }
            expect(counter).toEqual(transErrors.length)
            done()
        }, 500)
    })

    it('emits error on registration when server responds with error which contains generalized message', async (done: DoneFn) => {
        const error: RestError = { messageToken: 'INTER_ERR' }
        const restMock = jasmine.createSpyObj('RestService', ['do'])
        restMock.do.and.returnValue(new Observable(s => s.error(error)))
        
        const translatedErr: TranslatedErrors = { message: 'Internal server error' }
        const lngErrorMock = jasmine.createSpyObj('LanguageErrorService', ['getErrorsStrings'])
        lngErrorMock.getErrorsStrings.and.returnValue(of(translatedErr))

        await init({restMock, lngErrorMock})
        fixture.detectChanges()

        component.onError.subscribe(e => {
            expect(lngErrorMock.getErrorsStrings).toHaveBeenCalledWith(error)
            expect(e).toEqual(translatedErr.message)
            done()
        })
        
        component.ngOnInit()
    })
})