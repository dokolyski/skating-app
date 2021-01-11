import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as VLD from 'common/functions/validators';

@Component({
  selector: 'app-password[control]',
  templateUrl: './password.component.html'
})
export class PasswordComponent {

  /**
   * @description ```required```, ```min length of 8```, ```max length of 16```, ```pass all password regex```, ```above entropy of 0.5```
   */
  static controlSchema = ['', [
    Validators.required, Validators.minLength(8), Validators.maxLength(16),
    VLD.Validators.passwordPassAllRegex, VLD.Validators.aboveEntropy(0.5)
  ]];

  /**
   * @description ```required```
   */
  static controlSchemaOnlyRequired = ['', Validators.required];
  @Input()
  control: FormControl;
  @Input()
  serverError: string;
}
