import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-name[control]',
  templateUrl: './name.component.html'
})
export class NameComponent {

  /**
   * @description ```required```
   */
  static controlSchema = ['', Validators.required];
  @Input()
  control: FormControl;
  @Input()
  serverError: string;
}
