import { Component } from '@angular/core';
import { isMobile } from 'common/functions/mobile-check';
import * as PATH from 'assets/config/url.json';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  PATH = PATH['default'];
  isMobile = isMobile();
}
