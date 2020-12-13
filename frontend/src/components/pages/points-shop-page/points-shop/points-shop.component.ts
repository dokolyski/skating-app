import { Component } from '@angular/core';
import * as PRICE_TABLE from 'assets/config/price-list.json';
import { LanguageService } from 'services/language-service/Language.service';

@Component({
  selector: 'app-points-shop',
  templateUrl: './points-shop.component.html',
  styleUrls: ['./points-shop.component.css']
})
export class PointsShopComponent {
  readonly displayedColumns = ['points', 'money', 'buy'];
  readonly priceTable = PRICE_TABLE['default']

  constructor(public lngService: LanguageService) { }

  buy(money: number, points: number) {
    
  }
}
