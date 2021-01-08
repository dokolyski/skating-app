import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { isMobile } from 'common/functions/mobile-check';
import { LanguageService } from 'services/language-service/Language.service';
@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent {
  isMobile = isMobile();
  tabIndex = 0;

  constructor(public lngService: LanguageService) { }

  changeTab(event: MatTabChangeEvent) {
    this.tabIndex = event.index;
  }
}
