import { Component, OnDestroy } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SwUpdate } from '@angular/service-worker';
import { Subscription } from 'rxjs';
import { LanguageService } from 'services/language-service/Language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  lngSubscription: Subscription;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private sw: SwUpdate,
    private lngService: LanguageService,
    private adapter: DateAdapter<any>) {

    this.setDatepickerLanguage();
    this.loadIcons();
    this.handlePWA();
  }

  ngOnDestroy() {
    this.lngSubscription.unsubscribe();
  }

  private setDatepickerLanguage() {
    this.lngSubscription = this.lngService.dictionary$.subscribe(() => {
      if (this.lngService.language === 'polish') {
        this.adapter.setLocale('pl');
      } else {
        this.adapter.setLocale('en');
      }
    });
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
      this.sw.available.subscribe(() => { // pozniej to zmienimy na inne komponenty
        if (confirm('There is a new version of application. Would you like to update?')) {
          window.location.reload();
        }
      });
    } else {
      alert('Application cannot be used in offline mode');
    }
  }
}
