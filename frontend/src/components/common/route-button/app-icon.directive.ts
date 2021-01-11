import { Directive } from '@angular/core';
import { RouteButtonComponent } from './route-button.component';

@Directive({
    selector: '[appIcon]'
})
export class AppIconDirective {
    constructor(component: RouteButtonComponent) {
        component.icon = true;
    }
}
