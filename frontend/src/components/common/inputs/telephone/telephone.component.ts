import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-telephone[control]',
  templateUrl: './telephone.component.html'
})
export class TelephoneComponent {

  /**
   * @description ```required```
   */
  static controlSchema = ['', Validators.required];
  @Input()
  control: FormControl;
  @Input()
  serverError: string;
}
