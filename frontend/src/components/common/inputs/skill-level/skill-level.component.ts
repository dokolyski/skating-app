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

  static controlSchema = ['']
  static controlSchemaRequired = ['', Validators.required]
}
