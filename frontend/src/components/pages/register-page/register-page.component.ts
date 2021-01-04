import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isMobile } from 'common/mobile-check';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.style.css']
})
export class RegisterPageComponent {
  isMobile = isMobile();

  constructor(
    private router: Router) { }

  // navigate to previous url on same origin, if not same origin then navigate to main page
  back() {
    if(document.referrer.length > 0) {
      this.router.navigateByUrl(document.referrer);
    } else {
      this.router.navigate(['/']);
    }
  }
}
