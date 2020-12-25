import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
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
  exports: [LoginComponent]
};

@NgModule({
  imports: moduleInfo.imports,
  declarations: moduleInfo.declarations,
  exports: moduleInfo.exports
})
export class LoginModule { }
