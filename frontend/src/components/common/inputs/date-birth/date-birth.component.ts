import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { getMinDate, getMaxDate } from 'common/functions/date-constraints';

@Component({
  selector: 'app-date-birth[control]',
  templateUrl: './date-birth.component.html'
})
export class DateBirthComponent {

  /**
   * @description ```required```
   */
  static controlSchema = ['', Validators.required];
  @Input()
  control: FormControl;
  @Input()
  minDate: Date = getMinDate();
  @Input()
  maxDate: Date = getMaxDate();
  @Input()
  serverError: string;
}
