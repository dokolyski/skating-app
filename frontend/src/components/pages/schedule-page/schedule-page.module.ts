import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionCardComponent } from './session-card/session-card.component';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { WeekdayComponent } from './weekday/weekday.component';
import {SchedulePageComponent} from './schedule-page.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule
  ],
  exports: [
    SchedulePageComponent
  ],
  declarations: [
    SchedulePageComponent,
    SessionCardComponent,
    WeekdayComponent
  ]
})
export class SchedulePageModule { }
