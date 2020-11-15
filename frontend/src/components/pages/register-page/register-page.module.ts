import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page.component';
import { RegistrationModule } from './registration/registration.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    RegistrationModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  declarations: [RegisterPageComponent]
})
export class RegisterPageModule { }
