import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'services/language-service/Language.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.style.css']
})
export class RegisterPageComponent {
  private readonly waitTimeMs = 1000
  first = true
  _pending = false
  set pending(val) {
    if(this.first) {
      this._pending = val
      this.first = val
    } else {
      if(val) {
        this._pending = true
      } else {
        setTimeout(() => this._pending = false, this.waitTimeMs)
      }
    }
  }
  get pending() {
    return this._pending
  }


  constructor(
    private router: Router,
    public lngService: LanguageService) { }

  backTimeout() {
    setTimeout(this.back, this.waitTimeMs)
  }

  back() {
    if(document.referrer.length > 0) {
      this.router.navigateByUrl(document.referrer)
    } else {
      this.router.navigate(['/'])
    }
  }
}
