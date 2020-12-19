import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as VLD from 'common/validators';

@Component({
  selector: 'app-repeat-password[control][translation]',
  templateUrl: './repeat-password.component.html'
})
export class RepeatPasswordComponent {
  @Input()
  control: FormControl
  @Input()
  translation: { errors, form }

  static controlSchema = ['']
  static groupValidator = VLD.Validators.repeatPassword
}
