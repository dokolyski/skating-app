import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { InputsModule } from 'components/common/inputs/inputs.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { AccessControlModule } from 'directives/access-control/access-control.module';
import { TranslateModule } from '@ngx-translate/core';

export const moduleInfo = {
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatButtonModule,
    InputsModule,
    AccessControlModule
  ],
  declarations: [AccountSettingsComponent],
  exports: [AccountSettingsComponent]
};

@NgModule({
    imports: [
        moduleInfo.imports,
        TranslateModule
    ],
  declarations: moduleInfo.declarations,
  exports: moduleInfo.exports
})
export class AccountSettingsModule { }
