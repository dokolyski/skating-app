import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopPageComponent } from './shop-page.component';
import { PointsShopModule } from './points-shop/points-shop.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    PointsShopModule,
    MatCardModule
  ],
  declarations: [ShopPageComponent],
  exports: [ShopPageComponent]
})
export class ShopPageModule { }
