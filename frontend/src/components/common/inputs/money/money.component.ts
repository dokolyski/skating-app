import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as VLD from 'common/validators';

@Component({
  selector: 'app-money[control]',
  templateUrl: './money.component.html'
})
export class MoneyComponent {

  /**
   * @description ```required```, ```min length of 0.01```, ```max length of 1e6```, ```double precision number```
   */
  static controlSchema = ['', Validators.required, Validators.min(0.01), Validators.max(1e6), VLD.Validators.precision(2)];
  @Input()
  control: FormControl;
  // @Input()
  // translation: { errors, form };
  // @Input()
  // serverError: string;
}
