import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsChangeComponent } from './settings-change.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { InputsModule } from 'components/common/inputs/inputs.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatButtonModule,
    InputsModule
  ],
  declarations: [SettingsChangeComponent],
  exports: [SettingsChangeComponent]
})
export class SettingsChangeModule { }
