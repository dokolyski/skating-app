import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestService } from 'services/rest-service/Rest.service';
import { LanguageService } from 'services/language-service/Language.service';
import { LanguageErrorService } from 'services/languageError-service/LanguageError.service';
import { InputsModule } from 'components/common/inputs/inputs.module';

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
    InputsModule
  ],
  providers: [
    FormBuilder,
    RestService,
    LanguageService,
    LanguageErrorService,
    MatDatepickerModule,
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
  ],
  declarations: [RegistrationComponent],
  exports: [RegistrationComponent]
}

@NgModule({
  imports: moduleInfo.imports,
  providers: moduleInfo.providers,
  declarations: moduleInfo.declarations,
  exports: moduleInfo.exports
})
export class RegistrationModule { }
