import { Component } from '@angular/core';
import { LanguageService } from 'services/language-service/Language.service';
import * as PATH from 'assets/config/url.json';
import { AuthService } from 'services/auth-service/Auth.service';
import { redirectToMain } from 'common/functions/page-redirect';

@Component({
  selector: 'app-logged-actions',
  templateUrl: './logged-actions.component.html'
})
export class LoggedActionsComponent {
  path = PATH['default'];

  constructor(
    public auth: AuthService,
    public language: LanguageService) {}

  logout() {
    this.auth.logout().subscribe(redirectToMain);
  }
}
