import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPageComponent } from './account-page.component';
import { PointsShopModule } from './points-shop/points-shop.module';
import { MatCardModule } from '@angular/material/card';
import { LanguageService } from 'services/language-service/Language.service';

@NgModule({
  imports: [
    CommonModule,
    PointsShopModule,
    MatCardModule
  ],
  declarations: [AccountPageComponent],
  providers: [LanguageService]
})
export class AccountPageModule { }
