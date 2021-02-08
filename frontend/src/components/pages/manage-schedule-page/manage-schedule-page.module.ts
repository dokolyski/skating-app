import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageSchedulePageComponent } from './manage-schedule-page.component';
import {ScheduleModule} from 'components/common/schedule/schedule.module';
import {FullSecondaryBackgroundModule} from 'components/common/full-secondary-background/full-secondary-background.module';

@NgModule({
    imports: [
        CommonModule,
        ScheduleModule,
        FullSecondaryBackgroundModule
    ],
  declarations: [ManageSchedulePageComponent]
})
export class ManageSchedulePageModule { }
