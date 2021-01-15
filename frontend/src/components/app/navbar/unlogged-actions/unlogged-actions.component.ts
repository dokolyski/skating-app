import { Component } from '@angular/core';
import * as PATH from 'assets/config/url.json';

@Component({
  selector: 'app-unlogged-actions',
  templateUrl: './unlogged-actions.component.html'
})
export class UnloggedActionsComponent {
  path = PATH['default'];
}
