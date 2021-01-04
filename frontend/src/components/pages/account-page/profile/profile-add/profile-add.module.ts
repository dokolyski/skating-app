import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileAddComponent } from './profile-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { InputsModule } from 'components/common/inputs/inputs.module';
import {TranslateModule} from '@ngx-translate/core';

export const moduleInfo = {
  imports: [
    CommonModule,
    MatButtonModule,
    MatGridListModule,
    ReactiveFormsModule,
    InputsModule
  ],
  declarations: [ProfileAddComponent],
  exports: [ProfileAddComponent]
};

@NgModule({
    imports: [
        moduleInfo.imports,
        TranslateModule
    ],
  declarations: moduleInfo.declarations,
  exports: moduleInfo.exports
})
export class ProfileAddModule { }
