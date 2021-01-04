import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import * as PATH from 'assets/config/url.json';
import { NotLoggedGuard } from 'guards/NotLogged.guard';
import { AuthService } from 'services/auth-service/Auth.service';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private bodyElement: HTMLBodyElement = document.querySelector('body');
  notLogged: boolean;
  path = PATH['default'];

  constructor(
    private sanitizer: DomSanitizer,
    private auth: AuthService,
    private matIconRegistry: MatIconRegistry,
    private translate: TranslateService) {

    this.matIconRegistry.addSvgIcon(
      `small-logo`,
      sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/small-logo-thick.svg`)
    );
  }

  ngOnInit() {
    NotLoggedGuard.isLogged(this.auth).subscribe(notLogged => this.notLogged = notLogged);
  }

  changeLanguage(language: string) {
    this.bodyElement.animate([
      { opacity: 1 }, { opacity: 0 }
    ], { duration: 300 });

    this.translate.use(language);
    moment.locale(language);

    this.bodyElement.animate([
      { opacity: 0 }, { opacity: 1 }
    ], { duration: 300 });
  }
}
