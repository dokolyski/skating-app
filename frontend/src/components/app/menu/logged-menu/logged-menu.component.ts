import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'services/language-service/Language.service';
import * as PATH from 'assets/config/url.json';
import { AuthService } from 'services/auth-service/Auth.service';
import { redirectToMain } from 'common/page-redirect';

@Component({
  selector: 'app-menu-logged',
  templateUrl: './logged-menu.component.html'
})
export class LoggedMenuComponent implements OnInit {
  isAdmin: boolean;
  path = PATH['default'];

  constructor(
    public auth: AuthService,
    public language: LanguageService) {}

  ngOnInit() {
    this.auth.sessionInfo$.subscribe(({isAdmin}) => this.isAdmin = isAdmin);
  }

  logout() {
    this.auth.logout().subscribe(redirectToMain);
  }
}
