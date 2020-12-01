import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page.component';
import { RegistrationModule } from './registration/registration.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { LanguageService } from 'services/language-service/Language.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RegistrationModule,
    MatProgressSpinnerModule,
    MatCardModule,
    RouterModule
  ],
  declarations: [RegisterPageComponent],
  providers: [
    LanguageService
  ]
})
export class RegisterPageModule { }
