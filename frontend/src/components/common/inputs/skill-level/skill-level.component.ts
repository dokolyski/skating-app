import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-skill-level[control][translation][values]',
  templateUrl: './skill-level.component.html'
})
export class SkillLevelComponent {
  @Input()
  control: FormControl
  @Input()
  translation: { errors, form }
  @Input()
  values: string[]

  /**
   * @description no validators
   */
  static controlSchema = ['']

  /**
   * @description ```required```
   */
  static controlSchemaRequired = ['', Validators.required]
}
