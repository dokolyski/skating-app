import { Component, ViewEncapsulation } from '@angular/core';
import { LanguageService } from 'services/language-service/Language.service';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent {
  tabIndex = 0;
  
  constructor(public lngService: LanguageService) {}

  changeTab(event: MatTabChangeEvent) {
    this.tabIndex = event.index;
  }
}
