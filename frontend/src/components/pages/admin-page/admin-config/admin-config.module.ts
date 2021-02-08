import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminConfigComponent } from './admin-config.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { InteractiveTableModule } from 'components/common/interactive-table/interactive-table.module';
import { InputsModule } from 'components/common/inputs/inputs.module';
import { MatButtonModule } from '@angular/material/button';
import { AccessControlModule } from 'directives/access-control/access-control.module';
import { TranslateModule } from '@ngx-translate/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    InteractiveTableModule,
    InputsModule,
    FormsModule,
    MatButtonModule,
    AccessControlModule,
    TranslateModule,
    MatListModule,
    MatIconModule
  ],
  declarations: [
    AdminConfigComponent
  ],
  exports: [AdminConfigComponent]
})
export class AdminConfigModule { }
