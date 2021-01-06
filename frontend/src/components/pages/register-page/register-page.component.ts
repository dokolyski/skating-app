import { Component } from '@angular/core';
import { isMobile } from 'common/mobile-check';
import { redirectToMain } from 'common/page-redirect';
import { LanguageService } from 'services/language-service/Language.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.style.css']
})
export class RegisterPageComponent {
  redirectToMain = redirectToMain;
  isMobile = isMobile();

  constructor(
    public lngService: LanguageService) { }

  showError(e) {
    console.error(e);
  }
}
