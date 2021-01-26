import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestError } from 'api/rest-error';
import { RestService } from 'services/rest-service/rest.service';
import * as REST_PATH from 'api/rest-url.json';
import { NameComponent } from 'components/common/inputs/name/name.component';
import { LastnameComponent } from 'components/common/inputs/lastname/lastname.component';
import { DateBirthComponent } from 'components/common/inputs/date-birth/date-birth.component';
import { SkillLevelComponent } from 'components/common/inputs/skill-level/skill-level.component';
import { Skills } from 'api/rest-models/config-models';
import {ProfileRequest} from 'api/requests/profile.dto';
import * as REST_CONFIG from 'assets/config/config.rest.json';
import { ErrorInterceptorService } from 'services/error-interceptor-service/error-interceptor.service';
import { ErrorMessageService, TranslatedErrors } from 'services/error-message-service/error.message.service';
import {ConfigResponse} from 'api/responses/config.dto';
import {Observable, of} from 'rxjs';
import {AuthService} from 'services/auth-service/auth.service';
import {mergeMap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

/**
 * @description Creates next user profile with limit per user, gather informations about
 * required ```name```, ```lastname```, ```date of birth```, ```skill level```
 */
@Component({
  selector: 'app-profile-add',
  templateUrl: './profile-add.component.html',
  styleUrls: ['./profile-add.component.css']
})
export class ProfileAddComponent implements OnInit {
  readonly limit = 500;
  form = this.fb.group({
    name: NameComponent.controlSchema,
    lastname: LastnameComponent.controlSchema,
    dateBirth: DateBirthComponent.controlSchema,
    skillLevel: SkillLevelComponent.controlSchemaRequired
  });

  serverInputsErrors: { [input: string]: string };
  skillLevelPossibleValues: Skills;

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
    this.onCancel.subscribe(() => this.clearForm());
  }

  ngOnInit() {

    this.rest.do<ConfigResponse[]>(REST_PATH.CONFIG.GET, { templateParamsValues: { key: REST_CONFIG.skills } })
      .subscribe({
        next: (v: ConfigResponse[]) => this.skillLevelPossibleValues = [' ', ...v.map(value =>  value.value)],
        error: (e: HttpErrorResponse) => this.handleErrors(e, false)
      });
  }

  createProfile() {
    this.prepareProfilePayload().subscribe(body => {
      this.rest.do(REST_PATH.PROFILES.CREATE, { body })
        .subscribe({
          next: () => this.onSubmit.emit(),
          complete: () => this.onSubmit.emit(),
          error: (e: HttpErrorResponse) => this.handleErrors(e, true)
        });
    });
  }

  private prepareProfilePayload(): Observable<ProfileRequest> {
    const skill = this.form.get('skillLevel').value;
    return this.authService.sessionInfo$.pipe(mergeMap( sessionInfo => of({
      user_id: sessionInfo.uid,
      firstname: this.form.get('name').value,
      lastname: this.form.get('lastname').value,
      birth_date: this.form.get('dateBirth').value,
      skill_level: skill.length && skill !== ' ' ? skill : null,
      type: 'PROFILE'
    })));
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
                subfm.get(input).setErrors({ 'server-error': true });
              }
            }
          }

          this.serverInputsErrors = translation.inputs;
        }
      });
  }

  private clearForm() {
    this.form.reset();
    for (const c of Object.values(this.form.controls)) {
      for (const k of Object.keys(c.errors)) {
        c.errors[k] = null;
        // @ts-ignore
        c['status'] = 'VALID';
      }
    }
  }
}
