import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private sw: SwUpdate) {

    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/google-icon.svg')
    )

    this.matIconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/facebook-icon.svg')
    )

    if(this.sw.isEnabled) {
      this.sw.available.subscribe(() => { // pozniej to zmienimy na inne komponenty
        if(confirm('There is a new version of application. Would you like to update?')) {
          window.location.reload()
        }
      })
    } else {
      alert('Application cannot be used in offline mode')
    }
  }
}
