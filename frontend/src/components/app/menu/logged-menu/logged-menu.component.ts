import { Component } from '@angular/core';
import { LanguageService } from 'services/language-service/Language.service';
import * as PATH from 'assets/config/url.json';
import { AuthService } from 'services/auth-service/Auth.service';
import { redirectToMain } from 'common/functions/page-redirect';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu-logged',
  templateUrl: './logged-menu.component.html'
})
export class LoggedMenuComponent {
  isAdmin = this.auth.sessionInfo$.pipe(map(v => v.isAdmin));
  path = PATH['default'];

  constructor(
    public auth: AuthService,
    public language: LanguageService) {}

  logout() {
    this.auth.logout().subscribe(redirectToMain);
  }
}
