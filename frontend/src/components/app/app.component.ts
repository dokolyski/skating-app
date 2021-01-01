import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SwUpdate } from '@angular/service-worker';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LanguageService } from 'services/language-service/Language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, AfterViewInit {
  private bodyElement: HTMLBodyElement = document.querySelector('body');
  lngSubscription: Subscription;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private sw: SwUpdate,
    private lngService: LanguageService,
    private adapter: DateAdapter<any>) {

    this.bodyElement.style.visibility = 'hidden';

    this.setBrowserLanguage();
    this.setDatepickerLanguage();
    this.loadIcons();
    this.handlePWA();
  }

  ngAfterViewInit() {
    of(null).pipe(delay(500)).subscribe(() => {
      this.bodyElement.style.visibility = 'visible';
    });
  }

  ngOnDestroy() {
    this.lngSubscription.unsubscribe();
  }

  private setBrowserLanguage() {
    if(localStorage.getItem('browser-lng') === 'null') {
      this.lngService.language = (window.navigator.language === 'pl-PL') ? 'polish' : 'english';
      localStorage.setItem('browser-lng', this.lngService.language);
    }
  }

  private setDatepickerLanguage() {
    this.lngSubscription = this.lngService.dictionary$.subscribe(() => {
      this.adapter.setLocale(this.lngService.language === 'polish' ? 'pl' : 'en');
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
