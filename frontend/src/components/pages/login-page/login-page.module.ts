import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { LoginModule } from './login/login.module';
import { MatCardModule } from '@angular/material/card';
import { LanguageService } from 'services/language-service/Language.service';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    MatCardModule
  ],
  providers: [LanguageService],
  declarations: [LoginPageComponent]
})
export class LoginPageModule { }
