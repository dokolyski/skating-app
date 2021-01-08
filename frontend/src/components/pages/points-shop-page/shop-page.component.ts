import { Component } from '@angular/core';
import { isMobile } from 'common/functions/mobile-check';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html'
})
export class ShopPageComponent {
  isMobile = isMobile();
}
