import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RestService } from 'services/rest-service/Rest.service';

import * as REST_PATH from 'api/rest-url.json'
import { RestError } from 'api/rest-error'

import { VERIFICATION, PROFILES, CONFIG } from 'api/rest-types'
import { finalize, mergeMap } from 'rxjs/operators';

import * as VLD from './registration.validators';
import { LanguageErrorService, TranslatedErrors } from 'services/languageError-service/LanguageError.service';
import { of, Subscription } from 'rxjs';
import { LanguageService } from 'services/language-service/Language.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    base: this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [
        Validators.required, Validators.minLength(8), Validators.maxLength(16), 
        VLD.Validators.passwordPassAllRegex, VLD.Validators.aboveEntrophy(0.5)
        ]
      ],
      repeatPassword: ['']
    }, {
      validator: VLD.Validators.repeatPassword
    }),
    personal: this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      dateBirth: ['', Validators.required],
      telephoneNumber: ['', Validators.required],
    }),
    additional: this.fb.group({
      skillLevel: ['']
    })
  })

  subscription: Subscription
  skillLevelPossibleValues: string[]
  serverInputsErrors: {[input: string]: string}
  get minDate() {
    const today = new Date().getFullYear()
    const date = new Date()
    date.setFullYear(today - 122)
    return date
  }
  get maxDate() {
    return new Date()
  }

  @Output()
  onSubmit = new EventEmitter<void>()
  @Output()
  onStartWaiting = new EventEmitter<void>()
  @Output()
  onStopWaiting = new EventEmitter<void>()
  @Output()
  onCancel = new EventEmitter<void>()
  @Output()
  onError = new EventEmitter<string>()

  
  constructor(
    private fb: FormBuilder, 
    private rest: RestService,
    public lngService: LanguageService,
    private lngErrorService: LanguageErrorService,
    private _adapter: DateAdapter<any>) { 
      
      this.subscription = lngService.dictionary$.subscribe(() => {
        if(lngService.language == 'polish') {
          this._adapter.setLocale('pl')
        } else {
          this._adapter.setLocale('en')
        }
      })
    }

  ngOnInit() {
    this.onStartWaiting.emit()
    
    this.rest.do<CONFIG.GET.OUTPUT>(REST_PATH.CONFIG.GET, {templateParamsValues: {key: 'skillLevelPossibleValues'}})
    .pipe(
      finalize(() => this.onStopWaiting.emit())
    )
    .subscribe({
      next: (v: string[]) => this.skillLevelPossibleValues = [' ', ...v],
      error: (e: RestError) => {
        this.lngErrorService.getErrorsStrings(e)
        .subscribe((translation: TranslatedErrors) => {
          this.onError.emit(translation.message)
        })
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  register() {
    const registerBody = this.prepareRegisterPayload()
    this.onStartWaiting.emit()
    
    this.rest.do(REST_PATH.VERIFICATION.REGISTER, { body: registerBody })
    .pipe(
      mergeMap(() => {
        const skillLevel = this.form.get('additional.skillLevel').value
        if(skillLevel.length && skillLevel != ' ') {
          const editBody = this.prepareSelfProfilePayload()
          
          return this.rest.do(REST_PATH.PROFILES.EDIT, { body: editBody })
        }
        
        return of(null)
      }),
      finalize(() => this.onStopWaiting.emit())
    ).subscribe({
      next: () => this.onSubmit.emit(),
      error: (e: RestError) => {
        this.lngErrorService.getErrorsStrings(e)
        .subscribe((translation: TranslatedErrors) => {
          if(translation.message) {
            this.onError.emit(translation.message)
          }

          if(translation.inputs) {
            for(const input of Object.keys(translation.inputs)) {
              this.form.get(input).setErrors({'server-error': true})
            }

            this.serverInputsErrors = translation.inputs
          }
        })
      }
    })
  }

  private prepareRegisterPayload(): VERIFICATION.REGISTER.INPUT {
    const phone_number = this.form.get('personal.telephoneNumber').value

    return {
      fistname: this.form.get('personal.name').value,
      lastname: this.form.get('personal.lastname').value,
      email: this.form.get('base.email').value, 
      password: this.form.get('base.password').value,
      birth_date: this.form.get('personal.dateBirth').value,
      phone_number: phone_number.length ? phone_number : null
    }
  }

  private prepareSelfProfilePayload(): PROFILES.EDIT.INPUT {
    return {
      fistname: this.form.get('personal.name').value,
      lastname: this.form.get('personal.lastname').value,
      birth_date: this.form.get('personal.dateBirth').value,
      skill_level: this.form.get('additional.skillLevel').value
    }
  } 
}
