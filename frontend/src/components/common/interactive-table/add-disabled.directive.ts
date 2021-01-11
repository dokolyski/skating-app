import { Directive } from '@angular/core';
import { InteractiveTableComponent } from './interactive-table.component';

@Directive({
  selector: '[appAddDisabled]'
})
export class AddDisabledDirective {
  constructor(component: InteractiveTableComponent) {
    component.addDisabled = true;
   }
}
