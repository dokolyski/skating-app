import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lastname[control][translation]',
  templateUrl: './lastname.component.html'
})
export class LastnameComponent {
  @Input()
  control: FormControl
  @Input()
  translation: { errors, form }
  @Input()
  serverError: string

  /**
   * @description ```required```
   */
  static controlSchema = ['', Validators.required]
}
