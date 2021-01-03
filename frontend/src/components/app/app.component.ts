import { Component, OnDestroy } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { Subscription } from 'rxjs';
import { LanguageService } from 'services/language-service/Language.service';
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
    private lngService: LanguageService,
    private adapter: DateAdapter<any>) {

    this.setBrowserLanguage();
    this.setDatepickerLanguage();
    this.loadIcons();
    this.handlePWA();
  }

  ngOnDestroy() {
    this.subs.forEach(e => e.unsubscribe());
  }

  private setBrowserLanguage() {
    let lng = localStorage.getItem('browser-lng');
    if (lng === 'null' || lng === null) {
      this.lngService.language = lng = (window.navigator.language === 'pl-PL') ? 'polish' : 'english';
      localStorage.setItem('browser-lng', lng);
    }
  }

  private setDatepickerLanguage() {
    const lngSubscription = this.lngService.dictionary$.subscribe(() => {
      this.adapter.setLocale(this.lngService.language === 'polish' ? 'pl' : 'en');
    });

    this.subs.push(lngSubscription);
  }

  private loadIcons() {
    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/google-icon.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/facebook-icon.svg')
    );
  }

  private handlePWA() {
    if (this.sw.isEnabled) {
      this.sw.available
      .pipe(
        mergeMap(() => this.lngService.dictionary$),
        map(dict => dict.service_worker.UPDATE)
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
