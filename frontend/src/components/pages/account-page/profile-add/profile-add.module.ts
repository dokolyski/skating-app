import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from 'services/language-service/Language.service';
import { ProfileAddComponent } from './profile-add.component';
import { RestService } from 'services/rest-service/Rest.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LanguageErrorService } from 'services/languageError-service/LanguageError.service';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { InputsModule } from 'components/common/inputs/inputs.module';

export const moduleInfo = {
  imports: [
    CommonModule,
    MatButtonModule,
    MatGridListModule,
    ReactiveFormsModule,
    InputsModule
  ],
  declarations: [ProfileAddComponent],
  providers: [
    FormBuilder,
    RestService,
    LanguageService,
    LanguageErrorService
  ],
  exports: [ProfileAddComponent]
}

@NgModule({
  imports: moduleInfo.imports,
  providers: moduleInfo.providers,
  declarations: moduleInfo.declarations,
  exports: moduleInfo.exports
})
export class ProfileAddModule { }
