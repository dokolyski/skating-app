import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointsShopComponent } from './points-shop.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AccessControlModule } from 'directives/access-control/access-control.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    AccessControlModule,
    TranslateModule
  ],
  declarations: [PointsShopComponent],
  exports: [PointsShopComponent]
})
export class PointsShopModule { }
