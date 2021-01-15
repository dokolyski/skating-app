import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'services/auth-service/auth.service';
import { first } from 'rxjs/operators';
import * as PATH from 'assets/config/url.json';
import * as moment from 'moment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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
      this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/small-logo-thick.svg`)
    );
  }

  ngOnInit() {
    this.auth.sessionInfo$
      .pipe(
        first()
      ).subscribe(token => {
        this.notLogged = token == null;
      });
  }

  changeLanguage(language: string) {
    this.fadeOutPage();
    this.translate.use(language);
    moment.locale(language);
    this.fadeInPage();
  }

  private fadeOutPage() {
    this.bodyElement.animate([
      { opacity: 1 }, { opacity: 0 }
    ], { duration: 300 });
  }

  private fadeInPage() {
    this.bodyElement.animate([
      { opacity: 0 }, { opacity: 1 }
    ], { duration: 300 });
  }
}
