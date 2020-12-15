import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestError } from 'api/rest-error';
import { USER_INFO, PROFILES, CONFIG } from 'api/rest-types-client';
import { mergeMap, tap } from 'rxjs/operators';
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
import { Profile, User } from 'api/rest-models';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
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

  private _uInfo: User & Omit<Profile, 'type'>
  set userInfo(p) {
    this._uInfo = p

    this.form.get('email').setValue(p.email)
    this.form.get('name').setValue(p.firstname)
    this.form.get('lastname').setValue(p.lastname)
    this.form.get('dateBirth').setValue(p.birth_date)
    this.form.get('telephoneNumber').setValue(p.phone_number)
    this.form.get('skillLevel').setValue(p.skill_level == null ? ' ' : p.skill_level)
  }
  get userInfo() {
    return this._uInfo
  }

  set editMode(value: boolean) {
    if (value) {
      this.form.enable()
    } else {
      this.form.disable()
      if (this._uInfo) {
        this.userInfo = this._uInfo
      }
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
    let user 

    this.rest.do<CONFIG.GET.OUTPUT>(REST_PATH.CONFIG.GET, { templateParamsValues: { key: 'skillLevelPossibleValues' } })
      .pipe(
        mergeMap((v: string[]) => {
          this.skillLevelPossibleValues = [' ', ...v]
          this.editMode = false
          this.uid = this.auth.uid

          return this.rest.do<USER_INFO.GET.OUTPUT>(REST_PATH.USER_INFO.GET, { templateParamsValues: { id: this.uid } })
        }),
        mergeMap(data => {
          user = data
          return this.rest.do<PROFILES.GET_PROFILES.OUTPUT>(REST_PATH.PROFILES.GET_PROFILES)
        })
      )
      .subscribe({
        next: data => {
          const profile = data.find(el => el.type == 'OWNER')
          user.skill_level = profile?.skill_level ?? null
          this.userInfo = user
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
      firstname: this.form.get('name').value,
      lastname: this.form.get('lastname').value,
      email: this.form.get('email').value,
      birth_date: this.form.get('dateBirth').value,
      phone_number: this.form.get('telephoneNumber').value
    }
  }

  private prepareSelfProfilePayload(): PROFILES.EDIT.INPUT {
    const skill = this.form.get('skillLevel').value

    return {
      firstname: this.form.get('name').value,
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
