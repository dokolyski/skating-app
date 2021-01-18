import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditSessionComponent} from 'components/pages/edit-session/edit-session.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TranslateModule} from '@ngx-translate/core';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [EditSessionComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    TranslateModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class EditSessionModule { }
