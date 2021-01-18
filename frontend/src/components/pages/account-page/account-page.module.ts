import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPageComponent } from './account-page.component';
import { MiddleColumnModule } from 'components/common/middle-column/middle-column.module';
import { TabRouterOutletModule } from 'components/common/tab-router-outlet/tab-router-outlet.module';
import { TranslateModule } from '@ngx-translate/core';
import {AccessControlModule} from 'directives/access-control/access-control.module';

@NgModule({
  imports: [
    CommonModule,
    MiddleColumnModule,
    TabRouterOutletModule,
    TranslateModule,
    AccessControlModule
  ],
  declarations: [AccountPageComponent],
  exports: [AccountPageComponent]
})
export class AccountPageModule { }
