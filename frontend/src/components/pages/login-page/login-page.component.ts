import { Component } from '@angular/core';
import { LanguageService } from 'services/language-service/Language.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(public lngService: LanguageService) { }

}
