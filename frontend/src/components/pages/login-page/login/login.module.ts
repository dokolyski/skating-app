import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'services/auth-service/Auth.service';
import { LanguageService } from 'services/language-service/Language.service';
import { LanguageErrorService } from 'services/languageError-service/LanguageError.service';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { SocialAuthService } from 'angularx-social-login';
import { InputsModule } from 'components/common/inputs/inputs.module';

export const moduleInfo = {
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatGridListModule,
    InputsModule
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
