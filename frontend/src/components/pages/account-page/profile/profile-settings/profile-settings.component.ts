import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RestError} from 'api/rest-error';
import {RestService} from 'services/rest-service/rest.service';
import {restUrls} from 'api/rest-urls';
import {NameComponent} from 'components/common/inputs/name/name.component';
import {LastnameComponent} from 'components/common/inputs/lastname/lastname.component';
import {DateBirthComponent} from 'components/common/inputs/date-birth/date-birth.component';
import {SkillLevelComponent} from 'components/common/inputs/skill-level/skill-level.component';
import {mergeMap} from 'rxjs/operators';
import {Skills} from 'api/rest-models/config-models';
import {restConfig} from 'assets/config/rest-config';
import {ErrorMessageService, TranslatedErrors} from 'services/error-message-service/error.message.service';
import {ProfileResponse} from 'api/responses/profile.dto';
import {ConfigResponse} from 'api/responses/config.dto';
import {ErrorInterceptorService} from 'services/error-interceptor-service/error-interceptor.service';
import {AuthService} from 'services/auth-service/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

/**
 * @description Show profiles account settings and allow to change them, , gather informations about
 * required ```name```, ```lastname```, ```date of birth```, ```skill level```
 */
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  form = this.fb.group({
    name: NameComponent.controlSchema,
    lastname: LastnameComponent.controlSchema,
    dateBirth: DateBirthComponent.controlSchema,
    skillLevel: SkillLevelComponent.controlSchemaRequired
  });

  private _profile: ProfileResponse;

  set selectedProfile(p: ProfileResponse) {
    this._profile = p;

    this.form.get('name').setValue(p.firstname);
    this.form.get('lastname').setValue(p.lastname);
    this.form.get('dateBirth').setValue(p.birth_date);
    this.form.get('skillLevel').setValue(p.skill_level == null ? ' ' : p.skill_level);
  }

  get selectedProfile() {
    return this._profile;
  }

  profiles: ProfileResponse[];
  serverInputsErrors: { [input: string]: string };
  skillLevelPossibleValues: Skills;

  set editMode(value: boolean) {
    if (value) {
      this.form.enable();
    } else {
      this.form.disable();
      if (this._profile) {
        this.selectedProfile = this._profile;
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
    private fb: FormBuilder,
    private rest: RestService,
    private interceptor: ErrorInterceptorService,
    private errorMessageService: ErrorMessageService,
    private authService: AuthService) {

    this.onCancel.subscribe(() => {
      this.editMode = false;
      this.editMode = true;
    });
  }

  ngOnInit() {
    this.editMode = false;

    this.rest.do<ConfigResponse>(restUrls.CONFIG.GET, {templateParamsValues: {key: restConfig.skills}}).subscribe(next => {
      this.skillLevelPossibleValues = [' ', ...JSON.parse(next.value).map(value => value.name)];
    });

    return this.rest.do<ProfileResponse[]>(restUrls.PROFILES.INDEX).subscribe({
        next: data => {
          this.profiles = data;
          this.selectedProfile = data[0];
        },
        error: (e: HttpErrorResponse) => this.handleErrors(e, false)
      }
    );
  }

  edit() {
    const editBody = this.prepareProfilePayload();

    this.rest.do(restUrls.PROFILES.EDIT, {
      templateParamsValues: {id: this.selectedProfile.id.toString()},
      body: editBody
    })
      .subscribe({
        next: () => this.onSubmit.emit(),
        complete: () => this.onSubmit.emit(),
        error: (e: HttpErrorResponse) => this.handleErrors(e, true)
      });
  }

  private prepareProfilePayload() {
    const skill = this.form.get('skillLevel').value;
    return {
      ...this.selectedProfile, firstname: this.form.get('name').value,
      type: this.selectedProfile.is_owner ? 'OWNER' : 'PROFILE',
      lastname: this.form.get('lastname').value,
      birth_date: new Date(this.form.get('dateBirth').value),
      skill_level: skill.length && skill !== ' ' ? skill : null
    };
  }

  private handleErrors(error: HttpErrorResponse, showServerErrors: boolean) {
    this.errorMessageService.getErrorsStrings(error.error)
      .subscribe((translation: TranslatedErrors) => {
        if (translation.message) {
          this.interceptor.error.emit({message: translation.message, status: error.status});
        }

        if (showServerErrors && translation.inputs) {
          for (const input of Object.keys(translation.inputs)) {
            for (const c of Object.values(this.form.controls)) {
              const subfm = c as FormGroup;
              if (subfm.contains(input)) {
                subfm.get(input).setErrors({'server-error': true});
              }
            }
          }

          this.serverInputsErrors = translation.inputs;
        }
      });
  }
}
