import { Component } from '@angular/core';
import { isMobile } from 'common/functions/mobile-check';
import * as PATH from 'assets/config/url.json';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent {
  PATH = PATH['default'];
  isMobile = isMobile();

  constructor() { }

}
