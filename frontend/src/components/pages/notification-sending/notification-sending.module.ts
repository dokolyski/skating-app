import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationSendingComponent} from './notification-sending.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MiddleColumnModule} from 'components/common/middle-column/middle-column.module';



@NgModule({
  declarations: [NotificationSendingComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    FormsModule,
    MatButtonModule,
    MiddleColumnModule
  ]
})
export class NotificationSendingModule { }
