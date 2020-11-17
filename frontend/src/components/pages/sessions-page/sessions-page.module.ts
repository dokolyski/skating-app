import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionsPageComponent } from './sessions-page.component';
import { SessionCardComponent } from './session-card/session-card.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  declarations: [
    SessionsPageComponent,
    SessionCardComponent
  ]
})
export class SessionsPageModule { }
