import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ParticipantListComponent} from 'components/pages/participant-list/participant-list.component';
import {MatListModule} from '@angular/material/list';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [ParticipantListComponent],
  imports: [
    CommonModule,
    MatListModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class ParticipantListModule { }
