import { FormControl, Validators } from '@angular/forms';
import { Component, Input } from '@angular/core';
import * as VLD from 'common/functions/validators';

@Component({
  selector: 'app-email[control]',
  templateUrl: './email.component.html'
})
export class EmailComponent {

  /**
   * @description ```required```, ```email```
   */
  static controlSchema = ['', [Validators.required, VLD.Validators.email]];
  @Input()
  control: FormControl;
  @Input()
  serverError: string;
}
