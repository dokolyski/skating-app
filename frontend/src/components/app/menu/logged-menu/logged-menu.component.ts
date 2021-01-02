import { Component } from '@angular/core';
import { LanguageService } from 'services/language-service/Language.service';
import * as PATH from 'assets/config/url.json';
import { AuthService } from 'services/auth-service/Auth.service';

@Component({
  selector: 'app-menu-logged',
  templateUrl: './logged-menu.component.html'
})
export class LoggedMenuComponent {
  path = PATH['default'];

  constructor(
    public auth: AuthService,
    public language: LanguageService) {}
}
