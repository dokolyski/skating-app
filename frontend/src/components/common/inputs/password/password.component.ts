import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as VLD from 'common/validators';

@Component({
  selector: 'app-password[control][translation]',
  templateUrl: './password.component.html'
})
export class PasswordComponent {
  @Input()
  control: FormControl
  @Input()
  translation: { errors, form }
  @Input()
  serverError: string

  static controlSchema = ['', [
    Validators.required, Validators.minLength(8), Validators.maxLength(16),
    VLD.Validators.passwordPassAllRegex, VLD.Validators.aboveEntrophy(0.5)
  ]]

  static controlSchemaOnlyRequired = ['', Validators.required]
}
