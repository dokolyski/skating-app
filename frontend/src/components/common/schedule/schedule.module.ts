import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionCardComponent } from './session-card/session-card.component';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { WeekdayComponent } from './weekday/weekday.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { SessionInfoPaneComponent } from './session-card/session-info-pane/session-info-pane.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ProfilesViewportComponent } from './profiles-viewport/profiles-viewport.component';
import { AddParticipantDialogComponent } from './session-card/add-participant-dialog/add-participant-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import {EventService} from 'services/event-service/event.service';
import { ChooseParticipantDialogComponent } from './session-card/choose-participant-dialog/choose-participant-dialog.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ScheduleComponent } from './schedule.component';
import { NewSessionFormComponent } from './session-card/new-session-form/new-session-form.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    ScrollingModule,
    DragDropModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSidenavModule,
    MatBadgeModule,
    MatTooltipModule
  ],
  exports: [
    ScheduleComponent
  ],
  declarations: [
    ScheduleComponent,
    SessionCardComponent,
    WeekdayComponent,
    SessionInfoPaneComponent,
    ProfilesViewportComponent,
    AddParticipantDialogComponent,
    ChooseParticipantDialogComponent,
    NewSessionFormComponent,
  ],
  providers: [
    EventService
  ]
})
export class ScheduleModule { }
