import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestError } from 'api/rest-error';
import { USER_INFO, PROFILES } from 'api/rest-types';
import { mergeMap } from 'rxjs/operators';
import { LanguageService } from 'services/language-service/Language.service';
import { LanguageErrorService, TranslatedErrors } from 'services/languageError-service/LanguageError.service';
import { RestService } from 'services/rest-service/Rest.service';
import * as REST_PATH from 'api/rest-url.json'
import { AuthService } from 'services/auth-service/Auth.service';
import { EmailComponent } from 'components/common/inputs/email/email.component';
import { NameComponent } from 'components/common/inputs/name/name.component';
import { LastnameComponent } from 'components/common/inputs/lastname/lastname.component';
import { DateBirthComponent } from 'components/common/inputs/date-birth/date-birth.component';
import { TelephoneComponent } from 'components/common/inputs/telephone/telephone.component';
import { SkillLevelComponent } from 'components/common/inputs/skill-level/skill-level.component';

@Component({
  selector: 'app-settings-change',
  templateUrl: './settings-change.component.html',
  styleUrls: ['./settings-change.component.css']
})
export class SettingsChangeComponent implements OnInit {
  form = this.fb.group({
    email: EmailComponent.controlSchema,
    name: NameComponent.controlSchema,
    lastname: LastnameComponent.controlSchema,
    dateBirth: DateBirthComponent.controlSchema,
    telephoneNumber: TelephoneComponent.controlSchema,
    skillLevel: SkillLevelComponent.controlSchema
  })

  uid: string
  skillLevelPossibleValues: string[]
  serverInputsErrors: { [input: string]: string }
  
  set editMode(value: boolean) {
    if(value) {
      this.form.enable()
    } else {
      this.form.disable()
    }
  }
  get editMode() {
    return this.form.enabled
  }


  @Output()
  onSubmit = new EventEmitter<void>()
  @Output()
  onCancel = new EventEmitter<void>()
  @Output()
  onError = new EventEmitter<string>()


  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private rest: RestService,
    public lngService: LanguageService,
    private lngErrorService: LanguageErrorService) { }

  ngOnInit() {
    this.editMode = false
    this.uid = this.auth.uid

    this.rest.do<USER_INFO.GET.OUTPUT>(REST_PATH.USER_INFO.GET, { templateParamsValues: { id: this.uid } })
    .pipe(
      mergeMap(data => {
          this.form.get('email').setValue(data.email)
          this.form.get('name').setValue(data.fistname)
          this.form.get('lastname').setValue(data.lastname)
          this.form.get('dateBirth').setValue(data.birth_date)
          this.form.get('telephoneNumber').setValue(data.phone_number)

          return this.rest.do<PROFILES.GET_PROFILES.OUTPUT>(REST_PATH.PROFILES.GET_PROFILES)
      })
    )
    .subscribe({
        next: data => {
          const profile = data.find(el => el.type == 'OWNER')
          if(profile.skill_level) {
            this.form.get('skillLevel').setValue(profile.skill_level)
          }
        },
        error: (e: RestError) => this.handleErrors(e, false)
      })
  }

  edit() {
    const userInfoBody = this.prepareUserInfoPayload()

    this.rest.do(REST_PATH.USER_INFO.EDIT, { body: userInfoBody })
      .pipe(
        mergeMap(() => {
          const profileBody = this.prepareSelfProfilePayload()
          return this.rest.do(REST_PATH.PROFILES.EDIT, { body: profileBody })
        })
      ).subscribe({
        next: () => this.onSubmit.emit(),
        complete: () => this.onSubmit.emit(),
        error: (e: RestError) => this.handleErrors(e, true)
      })
  }

  private prepareUserInfoPayload(): USER_INFO.EDIT.INPUT {
    return {
      fistname: this.form.get('name').value,
      lastname: this.form.get('lastname').value,
      email: this.form.get('email').value,
      birth_date: this.form.get('dateBirth').value,
      phone_number: this.form.get('telephoneNumber').value
    }
  }

  private prepareSelfProfilePayload(): PROFILES.EDIT.INPUT {
    const skill = this.form.get('skillLevel').value

    return {
      fistname: this.form.get('name').value,
      lastname: this.form.get('lastname').value,
      birth_date: this.form.get('dateBirth').value,
      skill_level: skill.length && skill != ' ' ? skill : null
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
