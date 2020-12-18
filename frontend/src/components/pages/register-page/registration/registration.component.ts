import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestService } from 'services/rest-service/Rest.service';

import * as REST_PATH from 'api/rest-url.json'
import { RestError } from 'api/rest-error'

import { VERIFICATION, PROFILES, CONFIG } from 'api/rest-types-client'
import { mergeMap } from 'rxjs/operators';

import { LanguageErrorService, TranslatedErrors } from 'services/languageError-service/LanguageError.service';
import { LanguageService } from 'services/language-service/Language.service';
import { EmailComponent } from 'components/common/inputs/email/email.component';
import { PasswordComponent } from 'components/common/inputs/password/password.component';
import { RepeatPasswordComponent } from 'components/common/inputs/repeat-password/repeat-password.component';
import { NameComponent } from 'components/common/inputs/name/name.component';
import { LastnameComponent } from 'components/common/inputs/lastname/lastname.component';
import { DateBirthComponent } from 'components/common/inputs/date-birth/date-birth.component';
import { TelephoneComponent } from 'components/common/inputs/telephone/telephone.component';
import { SkillLevelComponent } from 'components/common/inputs/skill-level/skill-level.component';
import { of } from 'rxjs';

/**
 * @description Gather, validate and send to the ```REST``` server required user informations like 
 * ```email```, ```password```, ```name```, ```lastname```, ```date of birth```, ```telephone number``` and optional ```skill level```. 
 */
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form = this.fb.group({
    base: this.fb.group({
      email: EmailComponent.controlSchema,
      password: PasswordComponent.controlSchema,
      repeatPassword: RepeatPasswordComponent.controlSchema
    }, {
      validator: RepeatPasswordComponent.groupValidator
    }),
    personal: this.fb.group({
      name: NameComponent.controlSchema,
      lastname: LastnameComponent.controlSchema,
      dateBirth: DateBirthComponent.controlSchema,
      telephoneNumber: TelephoneComponent.controlSchema,
    }),
    additional: this.fb.group({
      skillLevel: SkillLevelComponent.controlSchema
    })
  })

  skillLevelPossibleValues: string[]
  serverInputsErrors: { [input: string]: string }

  @Output()
  onSubmit = new EventEmitter<void>()
  @Output()
  onCancel = new EventEmitter<void>()
  @Output()
  onError = new EventEmitter<string>()


  constructor(
    private fb: FormBuilder,
    private rest: RestService,
    public lngService: LanguageService,
    private lngErrorService: LanguageErrorService) { }

  ngOnInit() {
    this.rest.do<CONFIG.GET.OUTPUT>(REST_PATH.CONFIG.GET, { templateParamsValues: { key: 'skillLevelPossibleValues' } })
      .subscribe({
        next: (v: string[]) => this.skillLevelPossibleValues = [' ', ...v],
        error: (e: RestError) => this.handleErrors(e, false)
      })
  }

  register() {
    const registerBody = this.prepareRegisterPayload()

    // create account
    this.rest.do(REST_PATH.VERIFICATION.REGISTER, { body: registerBody })
      .pipe(
        mergeMap(() => {
          const skillLevel = this.form.get('additional.skillLevel').value

          // when user selects one of the skill then create profile
          if (skillLevel.length && skillLevel != ' ') {
            const editBody = this.prepareSelfProfilePayload()
            return this.rest.do(REST_PATH.PROFILES.EDIT, { body: editBody })
          }
          
          return of()
        })
      ).subscribe({
        next: () => this.onSubmit.emit(),
        complete: () => this.onSubmit.emit(),
        error: (e: RestError) => this.handleErrors(e, true)
      })
  }

  private prepareRegisterPayload(): VERIFICATION.REGISTER.INPUT {
    return {
      firstname: this.form.get('personal.name').value,
      lastname: this.form.get('personal.lastname').value,
      email: this.form.get('base.email').value,
      password: this.form.get('base.password').value,
      birth_date: this.form.get('personal.dateBirth').value,
      phone_number: this.form.get('personal.telephoneNumber').value
    }
  }

  private prepareSelfProfilePayload(): PROFILES.EDIT.INPUT {
    return {
      firstname: this.form.get('personal.name').value,
      lastname: this.form.get('personal.lastname').value,
      birth_date: this.form.get('personal.dateBirth').value,
      skill_level: this.form.get('additional.skillLevel').value
    }
  }

  private handleErrors(error: RestError, showServerErrors: boolean) {
    this.lngErrorService.getErrorsStrings(error)
      .subscribe((translation: TranslatedErrors) => {
        if (translation.message) {
          this.onError.emit(translation.message)
        }

        if (showServerErrors && translation.inputs) {
          for (const input of Object.keys(translation.inputs)) {
            for (const c of Object.values(this.form.controls)) {
              const subfm = c as FormGroup
              if (subfm.contains(input)) {
                subfm.get(input).setErrors({ 'server-error': true })
              }
            }
          }

          this.serverInputsErrors = translation.inputs
        }
      })
  }
}
