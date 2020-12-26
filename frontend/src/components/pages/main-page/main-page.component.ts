import { Component, ViewEncapsulation } from '@angular/core';
import { LanguageService } from 'services/language-service/Language.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent {
  constructor(
    public lngService: LanguageService
  ) {}
}
