import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { LoginModule } from './login/login.module';
import { MiddleColumnModule } from 'components/common/middle-column/middle-column.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    MiddleColumnModule,
    TranslateModule
  ],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent]
})
export class LoginPageModule { }
