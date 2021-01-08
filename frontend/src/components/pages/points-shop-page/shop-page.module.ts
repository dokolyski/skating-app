import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopPageComponent } from './shop-page.component';
import { PointsShopModule } from './points-shop/points-shop.module';
import { MiddleColumnModule } from 'components/common/middle-column/middle-column.module';

@NgModule({
  imports: [
    CommonModule,
    PointsShopModule,
    MiddleColumnModule
  ],
  declarations: [ShopPageComponent],
  exports: [ShopPageComponent]
})
export class ShopPageModule { }
