import { Component } from '@angular/core';
import { isMobile } from 'common/mobile-check';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  isMobile = isMobile();

  constructor() { }
}
