import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestService } from 'services/rest-service/Rest.service';
import { RestServiceMock } from 'mocks/RestService.mock';

export const moduleInfo = {
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    ReactiveFormsModule
  ],
  providers: [
    MatDatepickerModule,
    FormBuilder,
    { provide: RestService, useClass: RestServiceMock },
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
  ],
  declarations: [RegistrationComponent],
  exports: [RegistrationComponent]
}

@NgModule(moduleInfo)
export class RegistrationModule { }
