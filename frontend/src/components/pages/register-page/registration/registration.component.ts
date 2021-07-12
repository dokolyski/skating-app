import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestService} from 'services/rest-service/rest.service';

import {restUrls} from 'api/rest-urls';
import {RestError} from 'api/rest-error';

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
import {UserRequest} from 'api/requests/user.dto';
import {ProfileRequest} from 'api/requests/profile.dto';
import {restConfig} from 'assets/config/rest-config';
import {ConfigResponse} from 'api/responses/config.dto';
import {ErrorInterceptorService} from 'services/error-interceptor-service/error-interceptor.service';
import {MatVerticalStepper} from '@angular/material/stepper';
import {HttpErrorResponse} from '@angular/common/http';

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
  stepInputs: string[][] = [
    ['email', 'password'],
    ['firstname', 'lastname', 'birth_date', 'phone_number'],
    ['skill_level']
  ];

  @Output()
  onSubmit = new EventEmitter<void>();
  @Output()
  onCancel = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private rest: RestService,
    private interceptor: ErrorInterceptorService,
    private errorMessageService: ErrorMessageService) {
  }

  ngOnInit() {
    this.rest.do<ConfigResponse>(restUrls.CONFIG.GET, {templateParamsValues: {key: restConfig.skills}})
      .subscribe({
        next: (v: ConfigResponse) => this.skillLevelPossibleValues = [' ', ...JSON.parse(v.value).map(value => value.name)],
        error: (e: HttpErrorResponse) => this.handleErrors(e, false)
      });
  }

  register(stepper: MatVerticalStepper) {
    const registerBody = this.prepareRegisterPayload();

    // create account
    this.rest.do(restUrls.VERIFICATION.REGISTER, {body: registerBody}).subscribe({
      next: () => this.onSubmit.emit(),
      complete: () => this.onSubmit.emit(),
      error: (e: HttpErrorResponse) => {
        if (e?.error?.inputsTokens != null) {
          stepper.selectedIndex = this.getContainingStep(Object.keys(e.error.inputsTokens));
        }
        this.handleErrors(e.error, true);
      }
    });
  }

  private prepareRegisterPayload(): UserRequest {
    const payload: UserRequest = new UserRequest();

    payload.firstname = this.form.get('personal.name').value;
    payload.lastname = this.form.get('personal.lastname').value;
    payload.email = this.form.get('base.email').value;
    payload.password = this.form.get('base.password').value;
    payload.birth_date = this.form.get('personal.dateBirth').value;
    payload.phone_number = this.form.get('personal.telephoneNumber').value;

    return payload;
  }

  private handleErrors(error: HttpErrorResponse, showServerErrors: boolean) {
    this.errorMessageService.getErrorsStrings(error.error)
      .subscribe((translation: TranslatedErrors) => {
        if (translation.message) {
          this.interceptor.error.emit({message: translation.message, status: error.status});
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

  private getContainingStep(inputNames: string[]): number {
    return Math.min(...(inputNames.map(input => this.stepInputs.findIndex(value => value.includes(input)))
      .filter(value => value >= 0 && value < this.stepInputs.length)));
  }
}
