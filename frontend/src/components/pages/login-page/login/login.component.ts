import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ErrorMessageService, TranslatedErrors } from 'services/error-message-service/error.message.service';
import { RestError } from 'api/rest-error';
import { AuthService } from 'services/auth-service/auth.service';
import { Observable } from 'rxjs';
import { EmailComponent } from 'components/common/inputs/email/email.component';
import { PasswordComponent } from 'components/common/inputs/password/password.component';
import { ErrorInterceptorService } from 'services/error-interceptor-service/error-interceptor.service';

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
    private errorMessageService: ErrorMessageService) {}

  loginViaEmail() {
    if (this.form.valid) {
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;
      this.handleResponse(this.auth.loginViaEmail(email, password));
    }
  }

  loginViaGoogle() {
    this.handleResponse(this.auth.loginViaGoogle());
  }

  loginViaFacebook() {
    this.handleResponse(this.auth.loginViaFacebook());
  }

  private handleResponse(response: Observable<void>) {
    response.subscribe({
      complete: () => this.onSubmit.emit(),
      next: () => this.onSubmit.emit(),
      error: (e: RestError) => this.handleErrors(e)
    });
  }

  private handleErrors(errors: RestError) {
    this.errorMessageService.getErrorsStrings(errors)
      .subscribe((translation: TranslatedErrors) => {
        if (translation.message) {
          this.interceptor.error.emit(translation.message);
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
