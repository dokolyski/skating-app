import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'services/auth-service/Auth.service';
import { LanguageService } from 'services/language-service/Language.service';
import { LanguageErrorService } from 'services/languageError-service/LanguageError.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SocialAuthService } from 'angularx-social-login';

export const moduleInfo = {
  imports: [
    CommonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent],
  providers: [
    FormBuilder,
    SocialAuthService,
    AuthService,
    LanguageService,
    LanguageErrorService
  ],
  exports: [LoginComponent]
}

@NgModule({
  imports: moduleInfo.imports,
  declarations: moduleInfo.declarations,
  providers: moduleInfo.providers,
  exports: moduleInfo.exports
})
export class LoginModule { }
