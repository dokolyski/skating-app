import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import * as PATH from 'assets/config/url.json';
import { LanguageService } from 'services/language-service/Language.service';
import { NotLoggedGuard } from 'guards/NotLogged.guard';
import { AuthService } from 'services/auth-service/Auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  private bodyElement: HTMLBodyElement = document.querySelector('body');
  notLogged = NotLoggedGuard.isLogged(this.auth);
  path = PATH['default'];

  constructor(
    public language: LanguageService,
    private sanitizer: DomSanitizer,
    private auth: AuthService,
    private matIconRegistry: MatIconRegistry) {
    this.matIconRegistry.addSvgIcon(
      `small-logo`,
      sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/small-logo-thick.svg`)
    );
  }

  changeLanguage(language: 'polish'|'english') {
    this.bodyElement.animate([
      { opacity: 1 }, { opacity: 0 }
    ], { duration: 300 });

    this.language.language = language;

    this.bodyElement.animate([
      { opacity: 0 }, { opacity: 1 }
    ], { duration: 300 });
  }
}
