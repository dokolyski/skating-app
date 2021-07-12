import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ErrorMessageService} from 'services/error-message-service/error.message.service';
import {RestError} from 'api/rest-error';
import {AuthService} from 'services/auth-service/auth.service';
import {Observable, of} from 'rxjs';
import {EmailComponent} from 'components/common/inputs/email/email.component';
import {PasswordComponent} from 'components/common/inputs/password/password.component';
import {ErrorInterceptorService} from 'services/error-interceptor-service/error-interceptor.service';
import {HttpErrorResponse} from '@angular/common/http';
import {RestService} from 'services/rest-service/rest.service';
import {restUrls} from 'api/rest-urls';
import {mergeMap} from 'rxjs/operators';

/**
 * @description Allow user to sign in through ```email and password``` or ```social media``` like ```Google``` or ```Facebook```
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.group({
    email: EmailComponent.controlSchema,
    password: PasswordComponent.controlSchemaOnlyRequired
  });

  serverInputsErrors: { [input: string]: string };

  @Output()
  onSubmit = new EventEmitter<void>();

  labelsPath = 'pages.login';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private interceptor: ErrorInterceptorService,
    private errorMessageService: ErrorMessageService,
    private rest: RestService) {
  }

  loginViaEmail() {
    if (this.form.valid) {
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;
      this.handleResponse(this.auth.loginViaEmail(email, password));
    }
  }

  loginViaGoogle() {
    window.open('http://localhost:8080/api/verification/google', '_self');
  }

  loginViaFacebook() {
  }

  private handleResponse(response: Observable<void>) {
    response.subscribe({
      complete: () => this.onSubmit.emit(),
      next: () => this.onSubmit.emit(),
      error: (e: HttpErrorResponse) => this.handleErrors(e)
    });
  }

  private handleErrors(errors: HttpErrorResponse) {
    this.errorMessageService.getErrorsStrings(errors.error).pipe()
      .subscribe(translation => {
        if (translation.message) {
          this.interceptor.error.emit({message: translation.message, status: errors.status});
        }

        if (translation.inputs) {
          for (const input of Object.keys(translation.inputs)) {
            this.form.get(input).setErrors({ 'server-error': true });
          }

          this.serverInputsErrors = translation.inputs;
        }
      });
  }
}
