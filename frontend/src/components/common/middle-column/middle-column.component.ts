import {Component, Input} from '@angular/core';

/**
 * @description Creates 3 columns grid, insert ```child``` into center column, set background color to the rest.
 */
@Component({
  selector: 'app-middle-column',
  templateUrl: './middle-column.component.html',
  styleUrls: ['./middle-column.component.css']
})
export class MiddleColumnComponent {
  @Input() withBackground = true;
  @Input() withPadding = true;
}
