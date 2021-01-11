import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestError} from 'api/rest-error';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {RestService} from 'services/rest-service/Rest.service';
import * as REST_PATH from 'api/rest-url.json';
import {AuthService} from 'services/auth-service/Auth.service';
import {EmailComponent} from 'components/common/inputs/email/email.component';
import {NameComponent} from 'components/common/inputs/name/name.component';
import {LastnameComponent} from 'components/common/inputs/lastname/lastname.component';
import {DateBirthComponent} from 'components/common/inputs/date-birth/date-birth.component';
import {TelephoneComponent} from 'components/common/inputs/telephone/telephone.component';
import {SkillLevelComponent} from 'components/common/inputs/skill-level/skill-level.component';
import {of, Subject} from 'rxjs';
import {Skills} from 'api/rest-models/config-models';
import {ErrorMessageService, TranslatedErrors} from 'services/error-message-service/error.message.service';
import * as REST_CONFIG from 'assets/config/config.rest.json';
import {ProfileResponse} from 'api/responses/profile.dto';
import {UserResponse} from 'api/responses/user.dto';
import {UserRequest} from 'api/requests/user.dto';
import {ProfileRequest} from 'api/requests/profile.dto';
import {ConfigResponse} from 'api/responses/config.dto';

/**
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

  private _uInfo: UserResponse & Omit<ProfileResponse, 'type'>;
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
  @Output()
  onError = new EventEmitter<string>();


  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private rest: RestService,
    private errorMessageService: ErrorMessageService) {
      this.onCancel.subscribe(() => {
        this.editMode = false;
        this.editMode = true;
      });
     }

  ngOnInit() {
    let user;

    this.rest.do<ConfigResponse[]>(REST_PATH.CONFIG.GET, { templateParamsValues: { key: REST_CONFIG.skills } })
      .pipe(
        mergeMap((v: ConfigResponse[]) => {
          // TODO - to modify
          this.skillLevelPossibleValues = [' ', ...(v.filter(value => {
            return value.key === 'difficulty';
          }).map(value => value.value))];
          this.editMode = false;
          return this.auth.sessionInfo$;
        }),
        takeUntil(this.destroy),
        mergeMap(({uid}) => {
          return this.rest.do<UserResponse>(REST_PATH.USERS.GET, { templateParamsValues: { id: uid.toString() } });
        }),
        mergeMap(data => {
          user = data;
          return this.rest.do<ProfileResponse[]>(REST_PATH.PROFILES.GET);
        })
      )
      .subscribe({
        next: data => {
          const profile = data.find(el => el.is_owner);
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

  private prepareUserInfoPayload(): UserRequest {
    const body: UserRequest = new UserRequest();

    body.firstname = this.form.get('name').value;
    body.lastname = this.form.get('lastname').value;
    body.email = this.form.get('email').value;
    body.birth_date = this.form.get('dateBirth').value;
    body.phone_number = this.form.get('telephoneNumber').value;

    return body;
  }

  private prepareSelfProfilePayload(): ProfileRequest {
    const body: ProfileRequest = new ProfileRequest();

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
          this.onError.emit(translation.message);
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
