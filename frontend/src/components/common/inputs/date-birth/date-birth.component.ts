import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { getMinDate, getMaxDate } from 'common/date-constraints'

@Component({
  selector: 'app-date-birth[control][translation]',
  templateUrl: './date-birth.component.html'
})
export class DateBirthComponent {
  @Input()
  control: FormControl
  @Input()
  translation: { errors, form }
  @Input()
  minDate: Date = getMinDate()
  @Input()
  maxDate: Date = getMaxDate()
  @Input()
  serverError: string

  static controlSchema = ['', Validators.required]
}
