import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsComponent } from './profile-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { InputsModule } from 'components/common/inputs/inputs.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

export const moduleInfo = {
  imports: [
    CommonModule,
    MatButtonModule,
    MatGridListModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    InputsModule
  ],
  declarations: [ProfileSettingsComponent],
  exports: [ProfileSettingsComponent]
};

@NgModule({
  imports: moduleInfo.imports,
  declarations: moduleInfo.declarations,
  exports: moduleInfo.exports
})
export class ProfileSettingsModule { }
