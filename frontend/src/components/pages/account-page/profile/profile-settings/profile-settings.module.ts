import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsComponent } from './profile-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { InputsModule } from 'components/common/inputs/inputs.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { AccessControlModule } from 'directives/access-control/access-control.module';
import { TranslateModule } from '@ngx-translate/core';

export const moduleInfo = {
  imports: [
    CommonModule,
    MatButtonModule,
    MatGridListModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    InputsModule,
    AccessControlModule
  ],
  declarations: [ProfileSettingsComponent],
  exports: [ProfileSettingsComponent]
};

@NgModule({
    imports: [
        moduleInfo.imports,
        TranslateModule
    ],
  declarations: moduleInfo.declarations,
  exports: moduleInfo.exports
})
export class ProfileSettingsModule { }
