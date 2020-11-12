import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RestService } from 'services/RestService';

import * as REST_PATH from 'api/rest-url.json'
import { VERIFICATION, PROFILES, CONFIG } from 'api/rest-types'
import { Subject } from 'rxjs';
import { flatMap, takeUntil } from 'rxjs/operators';

import * as ESM from './error-state-matcher';

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

  @Input()
  onSubmit = new EventEmitter<void>()
  @Input()
  onStartWaiting = new EventEmitter<void>()
  @Input()
  onStopWaiting = new EventEmitter<void>()
  @Input()
  onCancel = new EventEmitter<void>()

  constructor(private fb: FormBuilder, private rest: RestService) { }

  ngOnInit() {
    const subject = new Subject()
    this.onStartWaiting.emit()
    
    this.rest.do<CONFIG.GET.OUTPUT>(REST_PATH.CONFIG.GET, {templateParamsValues: {key: `${123}`}})
    .pipe(
      takeUntil(subject)
    ).subscribe({
      next: (v: string[]) => {
        this.skillLevelPossibleValues = v
        subject.complete()
      },
      complete: this.onStopWaiting.emit
    })
  }

  register() {
    const registerBody = this.prepareRegisterPayload()
    this.onStartWaiting.emit()

    const subject = new Subject()
    this.rest.do(REST_PATH.VERIFICATION.REGISTER, { body: registerBody })
    .pipe(
      flatMap(() => {
        const skillLevel = this.form.get('additional.skillLevel').value
        if(skillLevel.length) {
          const editBody = this.prepareSelfProfilePayload()
          
          return this.rest.do(REST_PATH.PROFILES.EDIT, { body: editBody })
        }
      }),
      takeUntil(subject)
    ).subscribe({
      next: subject.complete,
      complete: () => {
        this.onStopWaiting.emit()
        this.onSubmit.emit()
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
