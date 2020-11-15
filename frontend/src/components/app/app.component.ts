import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private sw: SwUpdate) {
    if(sw.isEnabled) {
      sw.available.subscribe(() => { // pozniej to zmienimy na inne komponenty
        if(confirm('There is a new version of application. Would you like to update?')) {
          window.location.reload()
        }
      })
    } else {
      alert('Application cannot be used in offline mode')
    }
  }
}
