import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as VLD from 'common/validators';

@Component({
  selector: 'app-email[control][translation]',
  templateUrl: './email.component.html'
})
export class EmailComponent {
  @Input()
  control: FormControl
  @Input()
  translation: { errors, form }
  @Input()
  serverError: string

  static controlSchema = ['', [Validators.required, VLD.Validators.email]]
}
