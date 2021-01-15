import { FormControl, Validators } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lastname[control]',
  templateUrl: './lastname.component.html'
})
export class LastnameComponent {

  /**
   * @description ```required```
   */
  static controlSchema = ['', Validators.required];
  @Input()
  control: FormControl;
  @Input()
  serverError: string;
}
