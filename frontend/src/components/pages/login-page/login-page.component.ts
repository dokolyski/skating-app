import { Component } from '@angular/core';
import { isMobile } from 'common/functions/mobile-check';
import { redirectToMain } from 'common/functions/page-redirect';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  redirectToMain = redirectToMain;
  isMobile = isMobile();
}
