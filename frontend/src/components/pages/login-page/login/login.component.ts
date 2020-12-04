import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LanguageService } from 'services/language-service/Language.service';
import { LanguageErrorService, TranslatedErrors } from 'services/languageError-service/LanguageError.service';
import { RestError } from 'api/rest-error';
import { AuthService } from 'services/auth-service/Auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', Validators.required]
  })

  serverInputsErrors: {[input: string]: string}
  
  @Output()
  onSubmit = new EventEmitter<void>()
  @Output()
  onError = new EventEmitter<string>()

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public lngService: LanguageService,
    private lngErrorService: LanguageErrorService) { }

  loginViaEmail() {
    if(this.form.valid) {
      const email = this.form.get('email').value
      const password = this.form.get('password').value
      this.handleResponse(this.auth.loginViaEmail(email, password))
    }
  }

  loginViaGoogle() {
    this.handleResponse(this.auth.loginViaGoogle())
  }

  loginViaFacebook() {
    this.handleResponse(this.auth.loginViaFacebook())
  }

  private handleResponse(response: Observable<void>) {
    response.subscribe({
      complete: () => this.onSubmit.emit(),
      next: () => this.onSubmit.emit(),
      error: (e: RestError) => {
        this.lngErrorService.getErrorsStrings(e)
        .subscribe((translation: TranslatedErrors) => {
          if(translation.message) {
            this.onError.emit(translation.message)
          }

          if(translation.inputs) {
            for(const input of Object.keys(translation.inputs)) {
              this.form.get(input).setErrors({'server-error': true})
            }

            this.serverInputsErrors = translation.inputs
          }
        })
      }
    })
  }
}
