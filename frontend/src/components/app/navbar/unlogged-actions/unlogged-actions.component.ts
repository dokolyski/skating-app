import { Component } from '@angular/core';
import {urls} from 'assets/config/urls';

@Component({
  selector: 'app-unlogged-actions',
  templateUrl: './unlogged-actions.component.html'
})
export class UnloggedActionsComponent {
 urls = urls;
}
