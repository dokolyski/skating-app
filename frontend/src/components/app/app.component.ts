import { Component, OnDestroy } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { Subscription } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';
import { pubKey } from 'assets/config/vapid.pub.json';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  subs: Subscription[] = [];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private sw: SwUpdate,
    private swPush: SwPush,
    private adapter: DateAdapter<any>,
    private translate: TranslateService) {

    this.setLanguage();
    this.loadIcons();
    this.handlePWA();
  }

  ngOnDestroy() {
    this.subs.forEach(e => e.unsubscribe());
  }

  private setLanguage() {
    this.translate.use(localStorage.getItem('language') || this.translate.getDefaultLang());
    this.translate.onLangChange.subscribe(newLanguage => {
        localStorage.setItem('language', newLanguage.lang);
        this.adapter.setLocale(newLanguage.lang);
        console.log(newLanguage.lang);
    });
    this.adapter.setLocale(this.translate.currentLang);
    moment.locale(this.translate.currentLang);
  }

  private loadIcons() {
    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/google-icon.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook-icon.svg')
    );
  }

  private handlePWA() {
    if (this.sw.isEnabled) {
      this.sw.available
      .pipe(
        mergeMap(() => this.translate.get('service_worker.UPDATE'))
      )
      .subscribe((label: string) => {
        if (confirm(label)) {
          window.location.reload();
        }
      });

      this.swPush.requestSubscription({serverPublicKey: pubKey});
    }
  }
}
