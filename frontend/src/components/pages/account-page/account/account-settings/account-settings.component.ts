import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {RestService} from 'services/rest-service/rest.service';
import {restUrls} from 'api/rest-urls';
import {AuthService} from 'services/auth-service/auth.service';
import {EmailComponent} from 'components/common/inputs/email/email.component';
import {TelephoneComponent} from 'components/common/inputs/telephone/telephone.component';
import {Subject} from 'rxjs';
import {ErrorMessageService, TranslatedErrors} from 'services/error-message-service/error.message.service';
import {UserResponse} from 'api/responses/user.dto';
import {UserEditRequest} from 'api/requests/user.dto';
import {ErrorInterceptorService} from 'services/error-interceptor-service/error-interceptor.service';
import {HttpErrorResponse} from '@angular/common/http';

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
  private uid: number;
  form = this.fb.group({
    email: EmailComponent.controlSchema,
    telephoneNumber: TelephoneComponent.controlSchema
  });

  serverInputsErrors: { [input: string]: string };

  private _uInfo: UserResponse;
  set userInfo(p) {
    this._uInfo = p;
    this.form.get('email').setValue(p.email);
    this.form.get('telephoneNumber').setValue(p.phone_number);
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
    this.editMode = false;
    this.auth.sessionInfo$.pipe(takeUntil(this.destroy),
        mergeMap(({uid}) => {
          this.uid = uid;
          return this.rest.do<UserResponse>(restUrls.USERS.GET, { templateParamsValues: { id: uid.toString() } });
        })).subscribe({
        next: user => {
          this.userInfo = user;
        },
        error: (e: HttpErrorResponse) => this.handleErrors(e, false)
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  edit() {
    const userInfoBody = this.prepareUserInfoPayload();

    this.rest.do(restUrls.USERS.EDIT, { templateParamsValues: {id: this.uid.toString()}, body: userInfoBody }).subscribe({
        next: () => {
          this.onSubmit.emit();
        },
        complete: () => this.onSubmit.emit(),
        error: (e: HttpErrorResponse) => this.handleErrors(e, true)
      });
  }

  private prepareUserInfoPayload(): UserEditRequest {
    const body: UserEditRequest = new UserEditRequest();
    body.email = this.form.get('email').value;
    body.phone_number = this.form.get('telephoneNumber').value;

    return body;
  }

  private handleErrors(error: HttpErrorResponse, showServerErrors: boolean) {
    this.errorMessageService.getErrorsStrings(error.error)
      .subscribe((translation: TranslatedErrors) => {
        if (translation.message) {
          this.interceptor.error.emit({message: translation.message, status: error.status});
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
