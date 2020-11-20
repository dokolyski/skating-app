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
import { By } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { BehaviorSubject, Observable, of, Subject } from "rxjs"
import { filter, mergeMap } from "rxjs/operators"
import { LanguageErrorService } from "services/languageError-service/LanguageError.service"
import { RestService } from "services/rest-service/Rest.service"
import { RegistrationComponent } from "./registration.component"
import * as REST_PATH from 'api/rest-url.json'

describe('registration.component', () => {
    let fixture: ComponentFixture<RegistrationComponent>
    let component: RegistrationComponent

    async function init({restMock = undefined, lngErrorMock = undefined}) {
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
                MatProgressSpinnerModule,
                ReactiveFormsModule,
            ],
            declarations: [RegistrationComponent],
            providers: [
                FormBuilder,
                { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
                { provide: RestService, useValue: restMock },
                { provide: LanguageErrorService, useValue: lngErrorMock }
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(RegistrationComponent)
        component = fixture.componentInstance
    }

    it('fetch possible skills values', async (done: DoneFn) => {
        const skills = ['skill_1', 'skill_2', 'skill_3']

        const restMock = jasmine.createSpyObj('RestService', ['do'])
        restMock.do.and.returnValue(new Observable<any>(s => s.next(skills)))

        await init({restMock})
        component.onStartWaiting
        .pipe(
            mergeMap(() => component.onStopWaiting)
        ).subscribe(() => {
            expect(restMock.do).toHaveBeenCalled()
            expect(component.skillLevelPossibleValues).toEqual(skills)
        
            fixture.detectChanges()
                
            const set = fixture.debugElement.query(By.css('mat-select[formControlName="skillLevel"]'))
            for(const el of set.queryAll(By.css('mat-option'))) {
                expect(skills.findIndex(v => v == el.nativeElement.innerText)).toBeGreaterThanOrEqual(0)
            }
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
        component.onCancel.subscribe(done)

        const button = fixture.debugElement.query(By.css('button.cancelButton')).nativeElement
        button.click()
    })

    it('submits registration when user pass all phases without errors', async (done: DoneFn) => {
        const registerBody = {
            fistname: 'Name',
            lastname: 'Lastname',
            email: 'example@mail.com', 
            password: 'P@ssw0rd1234',
            birth_date: '1990-01-01',
            phone_number: '+48 123 456 789'
        }
        const profileBody = {
            fistname: registerBody.fistname,
            lastname: registerBody.lastname,
            birth_date: registerBody.birth_date,
            skill_level: 'skill_1'
        }
        
        const restMock = jasmine.createSpyObj('RestService', ['do'])
        restMock.do.and.callFake((path, { body }) => {
            switch(path) {
                case REST_PATH.CONFIG.GET:  return of([profileBody.skill_level])
                case REST_PATH.VERIFICATION.REGISTER:
                    expect(body).toEqual(registerBody)
                    return of()
                case REST_PATH.PROFILES.EDIT: 
                    expect(body).toEqual(profileBody)
                    return of()
            }
        })
        
        await init({restMock})
        fixture.detectChanges()
        
        component.onSubmit.subscribe(() => {
            const errorInfos = fixture.debugElement.queryAll(By.css('mat-error'))
            errorInfos.forEach(e => expect(e.nativeElement.innerHTML).toEqual(''))
            done()
        })

        const emailInput = fixture.debugElement.query(By.css('#email')).nativeElement
        const passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement
        const repeatPasswdInput = fixture.debugElement.query(By.css('#repeatPassword')).nativeElement
        
        const nameInput = fixture.debugElement.query(By.css('#name')).nativeElement
        const lastnameInput = fixture.debugElement.query(By.css('#lastname')).nativeElement
        const dateBirthInput = fixture.debugElement.query(By.css('#dateBirth')).nativeElement
        const telephoneNumInput = fixture.debugElement.query(By.css('#telephoneNumber')).nativeElement
        
        
        const nextButtons = fixture.debugElement.queryAll(By.css('button.nextButton')).map(e => e.nativeElement)
        const regButton = fixture.debugElement.query(By.css('#registerButton')).nativeElement
        
        // -- Start --
        
        let fm = component.form.get('base')
        fm.get('email').valueChanges.pipe(
            mergeMap(() => fm.get('password').valueChanges),
            mergeMap(() => fm.get('repeatPassword').valueChanges),
            mergeMap(() => {
                console.log('!')
                nextButtons[0].click()

                nameInput.value = registerBody.fistname
                lastnameInput.value = registerBody.lastname
                dateBirthInput.value = registerBody.birth_date
                telephoneNumInput.value = registerBody.phone_number
                nextButtons[1].click()
    
                fm = component.form.get('personal')
                return of()
            }),
            mergeMap(() => fm.get('lastname').valueChanges),
            mergeMap(() => fm.get('dateBirth').valueChanges),
            mergeMap(() => fm.get('telephoneNumber').valueChanges)
        ).subscribe(regButton.click)
            
        emailInput.value = registerBody.email
        passwordInput.value = registerBody.password
        repeatPasswdInput.value = registerBody.password
    })

    xit('shows client-side errors on invalid inputs values', async (done: DoneFn) => {

    })

    xit('shows server-side errors on invalid inputs values when server responds with error which contains inputs messages', async (done: DoneFn) => {

    })

    xit('emits error on registration when server responds with error which contains generalized message', async (done: DoneFn) => {

    })
})