import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import {SessionListComponent} from 'components/pages/session-list/session-list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { CancelSessionDialogComponent } from './cancel-session-dialog/cancel-session-dialog.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MiddleColumnModule} from 'components/common/middle-column/middle-column.module';



@NgModule({
  declarations: [SessionListComponent, CancelSessionDialogComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    TranslateModule,
    MatDialogModule,
    MatListModule,
    MiddleColumnModule
  ]
})
export class SessionListModule { }
