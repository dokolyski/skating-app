import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper"
import { CommonModule } from "@angular/common"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { FormBuilder, ReactiveFormsModule } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSelectModule } from "@angular/material/select"
import { MatStepperModule } from "@angular/material/stepper"
import { By } from "@angular/platform-browser"
import { Observable, of, Subject } from "rxjs"
import { LanguageErrorService } from "services/languageError-service/LanguageError.service"
import { RestService } from "services/rest-service/Rest.service"
import { RegistrationComponent } from "./registration.component"

describe('registration.component', () => {
    let fixture: ComponentFixture<RegistrationComponent>
    let component: RegistrationComponent

    async function init({restMock = undefined, lngErrorMock = undefined}) {
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MatStepperModule,
                MatSelectModule,
                MatCardModule,
                MatFormFieldModule,
                MatIconModule,
                MatInputModule,
                MatProgressSpinnerModule,
                ReactiveFormsModule,
            ],
            declarations: [RegistrationComponent],
            providers: [
                FormBuilder,
                { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
                { provide: RestService, useValue: restMock ?? {} },
                { provide: LanguageErrorService, useValue: lngErrorMock ?? {} }
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(RegistrationComponent)
        component = fixture.componentInstance
    }

    xit('fetch possible skills values', async (done: DoneFn) => {
        const skills = ['skill_1', 'skill_2', 'skill_3']

        const afterComponentInit = new Subject()
        const restMock = jasmine.createSpyObj('RestService', ['do'])
        restMock.do.and.returnValue(new Observable<any>(s => {
            s.next(skills)
            afterComponentInit.complete()
        }))

        await init({restMock})
        afterComponentInit.subscribe({
            complete: () => {
                alert(1)
                expect(component.skillLevelPossibleValues).toEqual(skills)
        
                /*fixture.detectChanges()
                
                const set = fixture.debugElement.query(By.css('mat-select[formControlName="skillLevel"]'))
                for(const el of set.queryAll(By.css('mat-option'))) {
                    expect(skills.findIndex(v => v == el.nativeElement.innerText)).toBeGreaterThanOrEqual(0)
                }*/
                done()
            }
        })
    })

    xit('emits error on fetch skills when server responds with error which contains generalized message', () => {

    })

    xit('cancels registration when user clicked cancel button', () => {

    })

    xit('submits registration when user pass all phases without errors', () => {

    })

    xit('shows client-side errors on invalid inputs values', () => {

    })

    xit('shows server-side errors on invalid inputs values when server responds with error which contains inputs messages', () => {

    })

    xit('emits error on registration when server responds with error which contains generalized message', () => {

    })
})