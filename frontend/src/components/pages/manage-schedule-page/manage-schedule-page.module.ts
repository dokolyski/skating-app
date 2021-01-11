import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageSchedulePageComponent } from './manage-schedule-page.component';
import {ScheduleModule} from 'components/common/schedule/schedule.module';

@NgModule({
    imports: [
        CommonModule,
        ScheduleModule
    ],
  declarations: [ManageSchedulePageComponent]
})
export class ManageSchedulePageModule { }
