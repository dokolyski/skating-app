import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { LoginModule } from './login/login.module';
import { MiddleColumnModule } from 'components/common/middle-column/middle-column.module';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    MiddleColumnModule
  ],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent]
})
export class LoginPageModule { }
