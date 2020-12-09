import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SessionsPageComponent} from './sessions-page.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  declarations: [
    SessionsPageComponent
  ]
})
export class SessionsPageModule { }
