import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page.component';
import { RegistrationModule } from './registration/registration.module';
import { RouterModule } from '@angular/router';
import { MiddleColumnModule } from 'components/common/middle-column/middle-column.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RegistrationModule,
    RouterModule,
    MiddleColumnModule,
    TranslateModule
  ],
  declarations: [RegisterPageComponent],
  exports: [RegisterPageComponent]
})
export class RegisterPageModule { }
