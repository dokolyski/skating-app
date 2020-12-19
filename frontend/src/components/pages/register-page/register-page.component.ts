import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'services/language-service/Language.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.style.css']
})
export class RegisterPageComponent {
  constructor(
    private router: Router,
    public lngService: LanguageService) { }

  back() {
    if(document.referrer.length > 0) {
      this.router.navigateByUrl(document.referrer)
    } else {
      this.router.navigate(['/'])
    }
  }
}
