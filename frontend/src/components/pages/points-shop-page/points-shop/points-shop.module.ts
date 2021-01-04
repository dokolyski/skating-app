import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointsShopComponent } from './points-shop.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  declarations: [PointsShopComponent],
  exports: [PointsShopComponent]
})
export class PointsShopModule { }
