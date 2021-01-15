import { InteractiveTableComponent } from './interactive-table.component';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appAddDisabled]'
})
export class AddDisabledDirective {
  constructor(component: InteractiveTableComponent) {
    component.addDisabled = true;
   }
}
