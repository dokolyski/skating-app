import { Component } from '@angular/core';
import { LanguageService } from 'services/language-service/Language.service';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent {
  constructor(public lngService: LanguageService) { }
}
