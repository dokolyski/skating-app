import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputsModule } from 'components/common/inputs/inputs.module';
import { AccessControlModule } from 'directives/access-control/access-control.module';

export const moduleInfo = {
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    InputsModule,
    AccessControlModule
  ],
  declarations: [RegistrationComponent],
  exports: [RegistrationComponent]
};

@NgModule({
  imports: moduleInfo.imports,
  declarations: moduleInfo.declarations,
  exports: moduleInfo.exports
})
export class RegistrationModule { }
