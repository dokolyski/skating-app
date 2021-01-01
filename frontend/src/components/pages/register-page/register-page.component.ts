import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isMobile } from 'common/mobile-check';
import { LanguageService } from 'services/language-service/Language.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.style.css']
})
export class RegisterPageComponent {
  isMobile = isMobile();

  constructor(
    private router: Router,
    public lngService: LanguageService) { }

  // navigate to previous url on same origin, if not same origin then navigate to main page
  back() {
    if(document.referrer.length > 0) {
      this.router.navigateByUrl(document.referrer);
    } else {
      this.router.navigate(['/']);
    }
  }
}
