import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestService} from 'services/rest-service/Rest.service';

import * as REST_PATH from 'api/rest-url.json';
import {RestError} from 'api/rest-error';

import {CONFIG, PROFILES, VERIFICATION} from 'api/rest-types';
import {mergeMap} from 'rxjs/operators';

import {ErrorMessageService, TranslatedErrors} from 'services/error-message-service/error.message.service';
import {EmailComponent} from 'components/common/inputs/email/email.component';
import {PasswordComponent} from 'components/common/inputs/password/password.component';
import {RepeatPasswordComponent} from 'components/common/inputs/repeat-password/repeat-password.component';
import {NameComponent} from 'components/common/inputs/name/name.component';
import {LastnameComponent} from 'components/common/inputs/lastname/lastname.component';
import {DateBirthComponent} from 'components/common/inputs/date-birth/date-birth.component';
import {TelephoneComponent} from 'components/common/inputs/telephone/telephone.component';
import {SkillLevelComponent} from 'components/common/inputs/skill-level/skill-level.component';
import {of} from 'rxjs';
import {Skills} from 'api/rest-models/config-models';
import {ProfileRequest as Profile} from 'api/rest-models/profile-request';
import {UserRequest as User} from 'api/rest-models/user-request';

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
  });

  skillLevelPossibleValues: Skills;
  serverInputsErrors: { [input: string]: string };

  @Output()
  onSubmit = new EventEmitter<void>();
  @Output()
  onCancel = new EventEmitter<void>();
  @Output()
  onError = new EventEmitter<string>();


  constructor(
    private fb: FormBuilder,
    private rest: RestService,
    private errorMessageService: ErrorMessageService) {
  }

  ngOnInit() {
    this.rest.do<CONFIG.GET.OUTPUT>(REST_PATH.CONFIG.GET, {templateParamsValues: {key: 'skillLevelPossibleValues'}})
      .subscribe({
        next: (v: string[]) => this.skillLevelPossibleValues = [' ', ...v],
        error: (e: RestError) => this.handleErrors(e, false)
      });
  }

  register() {
    const registerBody = this.prepareRegisterPayload();

    // create account
    this.rest.do(REST_PATH.VERIFICATION.REGISTER, {body: registerBody})
      .pipe(
        mergeMap(() => {
          const skillLevel = this.form.get('additional.skillLevel').value;

          // when user selects one of the skill then create profile
          if (skillLevel.length && skillLevel !== ' ') {
            const editBody = this.prepareSelfProfilePayload();
            return this.rest.do(REST_PATH.PROFILES.EDIT, {body: editBody});
          }

          return of();
        })
      ).subscribe({
      next: () => this.onSubmit.emit(),
      complete: () => this.onSubmit.emit(),
      error: (e: RestError) => this.handleErrors(e, true)
    });
  }

  private prepareRegisterPayload(): VERIFICATION.REGISTER.INPUT {
    const payload: VERIFICATION.REGISTER.INPUT = new User();

    payload.firstname = this.form.get('personal.name').value;
    payload.lastname = this.form.get('personal.lastname').value;
    payload.email = this.form.get('base.email').value;
    payload.password = this.form.get('base.password').value;
    payload.birth_date = this.form.get('personal.dateBirth').value;
    payload.phone_number = this.form.get('personal.telephoneNumber').value;

    return payload;
  }

  private prepareSelfProfilePayload(): PROFILES.CREATE.INPUT {
    const payload: PROFILES.CREATE.INPUT = new Profile();

    payload.firstname = this.form.get('personal.name').value;
    payload.lastname = this.form.get('personal.lastname').value;
    payload.birth_date = this.form.get('personal.dateBirth').value;
    payload.skill_level = this.form.get('additional.skillLevel').value;

    return payload;
  }

  private handleErrors(error: RestError, showServerErrors: boolean) {
    this.errorMessageService.getErrorsStrings(error)
      .subscribe((translation: TranslatedErrors) => {
        if (translation.message) {
          this.onError.emit(translation.message);
        }

        if (showServerErrors && translation.inputs) {
          for (const input of Object.keys(translation.inputs)) {
            const fullName = this.getFormControlFullName(input);
            this.form.get(fullName).setErrors({'server-error': true});
          }

          this.serverInputsErrors = translation.inputs;
        }
      });
  }

  private getFormControlFullName(name: string): string {
    switch (name) {
      case 'email':
        return 'base.email';
      case 'password':
        return 'base.password';
      case 'firstname':
        return 'base.name';
      case 'lastname':
        return 'base.lastname';
      case 'phone_number':
        return 'base.telephoneNumber';
    }
  }
}
