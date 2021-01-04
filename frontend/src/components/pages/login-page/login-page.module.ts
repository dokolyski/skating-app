import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { LoginModule } from './login/login.module';
import { MatCardModule } from '@angular/material/card';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        LoginModule,
        MatCardModule,
        TranslateModule
    ],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent]
})
export class LoginPageModule { }
