import { Component } from '@angular/core';
import { isMobile } from 'common/functions/mobile-check';
import { redirectToMain } from 'common/functions/page-redirect';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {
  redirectToMain = redirectToMain;
  isMobile = isMobile();
}
