import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RestService } from 'services/Rest.service';

import * as REST_PATH from 'api/rest-url.json'
import { RestError } from 'api/rest-error'

import { VERIFICATION, PROFILES, CONFIG } from 'api/rest-types'
import { flatMap } from 'rxjs/operators';

import * as ESM from './error-state-matcher';
import { LanguageErrorService, TranslatedErrors } from 'services/LanguageError.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  form = this.fb.group({
    base: this.fb.group({
      email: [''],
      password: [''],
      repeatPassword: ['']
    }),
    personal: this.fb.group({
      name: [''],
      lastname: [''],
      dateBirth: [''],
      telephoneNumber: [''],
    }),
    additional: this.fb.group({
      skillLevel: ['']
    })
  })

  skillLevelPossibleValues: string[]
  errorStateMatcher = {
    password: new ESM.PasswordErrorStateMatcher(),
    repeatPassword: new ESM.RepeatPasswordErrorStateMatcher(),
    name: new ESM.NameErrorStateMatcher(),
    lastname: new ESM.LastnameErrorStateMatcher(),
    dateBirthday: new ESM.DatebirthdayErrorStateMatcher()
  }

  serverInputsErrors: {[input: string]: string}

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
    private lngErrorService: LanguageErrorService) { }

  ngOnInit() {
    this.onStartWaiting.emit()
    
    this.rest.do<CONFIG.GET.OUTPUT>(REST_PATH.CONFIG.GET, {templateParamsValues: {key: 'skillLevelPossibleValues'}})
    .subscribe({
      next: (v: string[]) => this.skillLevelPossibleValues = v,
      error: (e: RestError) => {
        this.lngErrorService.getErrorsStrings(e)
        .subscribe((translation: TranslatedErrors) => {
          this.onError.emit(translation.message)
        })
      }
    })
    .add(this.onStopWaiting.emit)
  }

  register() {
    const registerBody = this.prepareRegisterPayload()
    this.onStartWaiting.emit()

    this.rest.do(REST_PATH.VERIFICATION.REGISTER, { body: registerBody })
    .pipe(
      flatMap(() => {
        const skillLevel = this.form.get('additional.skillLevel').value
        if(skillLevel.length) {
          const editBody = this.prepareSelfProfilePayload()
          
          return this.rest.do(REST_PATH.PROFILES.EDIT, { body: editBody })
        }
      })
    ).subscribe({
      complete: this.onSubmit.emit,
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
    .add(this.onStopWaiting.emit)
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
