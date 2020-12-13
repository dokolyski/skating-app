import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsChangeComponent } from './settings-change.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatButtonToggleModule,
    ReactiveFormsModule
  ],
  declarations: [SettingsChangeComponent]
})
export class SettingsChangeModule { }
