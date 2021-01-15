import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RestError } from 'api/rest-error';
import { USERS, PROFILES, CONFIG } from 'api/rest-types';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { RestService } from 'services/rest-service/rest.service';
import * as REST_PATH from 'api/rest-url.json';
import { AuthService } from 'services/auth-service/auth.service';
import { EmailComponent } from 'components/common/inputs/email/email.component';
import { NameComponent } from 'components/common/inputs/name/name.component';
import { LastnameComponent } from 'components/common/inputs/lastname/lastname.component';
import { DateBirthComponent } from 'components/common/inputs/date-birth/date-birth.component';
import { TelephoneComponent } from 'components/common/inputs/telephone/telephone.component';
import { SkillLevelComponent } from 'components/common/inputs/skill-level/skill-level.component';
import { ProfileRequest as Profile } from 'api/rest-models/profile-request';
import { UserRequest as User } from 'api/rest-models/user-request';
import { of, Subject } from 'rxjs';
import { Skills } from 'api/rest-models/config-models';
import { ErrorMessageService, TranslatedErrors } from 'services/error-message-service/error.message.service';
import * as REST_CONFIG from 'assets/config/config.rest.json';
import { ErrorInterceptorService } from 'services/error-interceptor-service/error-interceptor.service';

/***
 * @description Show user settings and allow to change them, gather informations about
 * required ```email```, ```name```, ```lastname```, ```date of birth```, ```telephone number``` and optional ```skill level```
 */
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
  private destroy = new Subject();

  form = this.fb.group({
    email: EmailComponent.controlSchema,
    name: NameComponent.controlSchema,
    lastname: LastnameComponent.controlSchema,
    dateBirth: DateBirthComponent.controlSchema,
    telephoneNumber: TelephoneComponent.controlSchema,
    skillLevel: SkillLevelComponent.controlSchema
  });

  skillLevelPossibleValues: Skills;
  serverInputsErrors: { [input: string]: string };

  private _uInfo: User & Omit<Profile, 'type'>;
  set userInfo(p) {
    this._uInfo = p;

    this.form.get('email').setValue(p.email);
    this.form.get('name').setValue(p.firstname);
    this.form.get('lastname').setValue(p.lastname);
    this.form.get('dateBirth').setValue(p.birth_date);
    this.form.get('telephoneNumber').setValue(p.phone_number);
    this.form.get('skillLevel').setValue(p.skill_level == null ? ' ' : p.skill_level);
  }
  get userInfo() {
    return this._uInfo;
  }

  set editMode(value: boolean) {
    if (value) {
      this.form.enable();
    } else {
      this.form.disable();
      if (this._uInfo) {
        this.userInfo = this._uInfo;
      }
    }
  }
  get editMode() {
    return this.form.enabled;
  }

  @Output()
  onSubmit = new EventEmitter<void>();
  @Output()
  onCancel = new EventEmitter<void>();

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private rest: RestService,
    private interceptor: ErrorInterceptorService,
    private errorMessageService: ErrorMessageService) {

      this.onCancel.subscribe(() => {
        this.editMode = false;
        this.editMode = true;
      });
     }

  ngOnInit() {
    let user;

    this.rest.do<CONFIG.GET.OUTPUT>(REST_PATH.CONFIG.GET, { templateParamsValues: { key: REST_CONFIG.skills } })
      .pipe(
        mergeMap((v: string[]) => {
          this.skillLevelPossibleValues = [' ', ...v];
          this.editMode = false;
          return this.auth.sessionInfo$;
        }),
        takeUntil(this.destroy),
        mergeMap(({uid}) => {
          return this.rest.do<USERS.GET.OUTPUT>(REST_PATH.USERS.GET, { templateParamsValues: { id: uid.toString() } });
        }),
        mergeMap(data => {
          user = data;
          return this.rest.do<PROFILES.INDEX.OUTPUT>(REST_PATH.PROFILES.GET);
        })
      )
      .subscribe({
        next: data => {
          const profile = data.find(el => el.type === 'OWNER');
          user.skill_level = profile?.skill_level ?? null;
          this.userInfo = user;
        },
        error: (e: RestError) => this.handleErrors(e, false)
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  edit() {
    const userInfoBody = this.prepareUserInfoPayload();

    this.rest.do(REST_PATH.USERS.EDIT, { body: userInfoBody })
      .pipe(
        mergeMap(() => {
          if(this.userInfo.skill_level !== this.form.get('skillLevel').value) {
            const profileBody = this.prepareSelfProfilePayload();
            return this.rest.do(REST_PATH.PROFILES.EDIT, { body: (profileBody as any) });
          }

          return of(null);
        })
      ).subscribe({
        next: () => {
          this.userInfo = this.userInfo;
          this.onSubmit.emit();
        },
        complete: () => this.onSubmit.emit(),
        error: (e: RestError) => this.handleErrors(e, true)
      });
  }

  private prepareUserInfoPayload(): USERS.EDIT.INPUT {
    const body: USERS.EDIT.INPUT = new User();

    body.firstname = this.form.get('name').value;
    body.lastname = this.form.get('lastname').value;
    body.email = this.form.get('email').value;
    body.birth_date = this.form.get('dateBirth').value;
    body.phone_number = this.form.get('telephoneNumber').value;

    return body;
  }

  private prepareSelfProfilePayload(): PROFILES.EDIT.INPUT {
    const body: PROFILES.EDIT.INPUT = new Profile();

    const skill = this.form.get('skillLevel').value;
    body.firstname = this.form.get('name').value,
    body.lastname = this.form.get('lastname').value,
    body.birth_date = this.form.get('dateBirth').value,
    body.skill_level = skill.length && skill !== ' ' ? skill : null;

    return body;
  }

  private handleErrors(error: RestError, showServerErrors: boolean) {
    this.errorMessageService.getErrorsStrings(error)
      .subscribe((translation: TranslatedErrors) => {
        if (translation.message) {
          this.interceptor.error.emit(translation.message);
        }

        if (showServerErrors && translation.inputs) {
          for (const input of Object.keys(translation.inputs)) {
            this.form.get(input).setErrors({ 'server-error': true });
          }

          this.serverInputsErrors = translation.inputs;
        }
      });
  }
}
