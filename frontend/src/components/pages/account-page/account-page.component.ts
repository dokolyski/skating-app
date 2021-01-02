import { Component } from '@angular/core';
import { LanguageService } from 'services/language-service/Language.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent {

  constructor(public lngService: LanguageService) { }

}
