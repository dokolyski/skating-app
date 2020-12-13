import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-telephone[control][translation]',
  templateUrl: './telephone.component.html'
})
export class TelephoneComponent {
  @Input()
  control: FormControl
  @Input()
  translation: { errors, form }
  @Input()
  serverError: string

  static controlSchema = ['', Validators.required]
}
