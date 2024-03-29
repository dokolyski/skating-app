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
import { ChooseParticipantDialogComponent } from './session-card/choose-participant-dialog/choose-participant-dialog.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ScheduleComponent } from './schedule.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {AccessControlModule} from 'directives/access-control/access-control.module';
import {MiddleColumnModule} from 'components/common/middle-column/middle-column.module';

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
        MatTooltipModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatInputModule,
        TranslateModule,
        FormsModule,
        AccessControlModule,
        MiddleColumnModule
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
    ChooseParticipantDialogComponent
  ],
  providers: []
})
export class ScheduleModule { }
