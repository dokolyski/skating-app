import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as VLD from 'common/functions/validators';

@Component({
  selector: 'app-points[control]',
  templateUrl: './points.component.html'
})
export class PointsComponent {

  /**
   * @description ```required```, ```min length of 0```, ```max length of 1e6```, ```is integer```
   */
  static controlSchema = ['', [Validators.required, Validators.min(0), Validators.max(1e6), VLD.Validators.integer]];
  @Input()
  control: FormControl;
}
