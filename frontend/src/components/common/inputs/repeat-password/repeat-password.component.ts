import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as VLD from 'common/validators';

@Component({
  selector: 'app-repeat-password[control]',
  templateUrl: './repeat-password.component.html'
})
export class RepeatPasswordComponent {

  /**
   * @description no validators
   */
  static controlSchema = [''];

  /**
   * @description ```same as password```
   */
  static groupValidator = VLD.Validators.repeatPassword;
  @Input()
  control: FormControl;
}
