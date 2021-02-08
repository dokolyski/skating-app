import {AccountPageComponent} from 'components/pages/account-page/account-page.component';
import {SchedulePageComponent} from 'components/pages/schedule-page/schedule-page.component';
import {MainPageComponent} from 'components/pages/main-page/main-page.component';
import {RegisterPageComponent} from 'components/pages/register-page/register-page.component';
import {LoginPageComponent} from 'components/pages/login-page/login-page.component';
import {ShopPageComponent} from './points-shop-page/shop-page.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {AccountNotificationsComponent} from './account-page/account/account-notifications/account-notifications.component';
import {AccountSettingsComponent} from './account-page/account/account-settings/account-settings.component';
import {ProfileAddComponent} from './account-page/profile/profile-add/profile-add.component';
import {ProfileSettingsComponent} from './account-page/profile/profile-settings/profile-settings.component';
import {AdminConfigComponent} from './admin-page/admin-config/admin-config.component';
import {AdminUsersComponent} from './admin-page/admin-users/admin-users.component';
import {ManageSchedulePageComponent} from 'components/pages/manage-schedule-page/manage-schedule-page.component';

import {NgModule} from '@angular/core';
import {AccountPageModule} from './account-page/account-page.module';
import {LoginPageModule} from './login-page/login-page.module';
import {MainPageModule} from './main-page/main-page.module';
import {RegisterPageModule} from './register-page/register-page.module';
import {SchedulePageModule} from './schedule-page/schedule-page.module';
import {ShopPageModule} from './points-shop-page/shop-page.module';
import {AdminPageModule} from './admin-page/admin-page.module';
import {AccountNotificationsModule} from './account-page/account/account-notifications/account-notifications.module';
import {AccountSettingsModule} from './account-page/account/account-settings/account-settings.module';
import {ProfileAddModule} from './account-page/profile/profile-add/profile-add.module';
import {ProfileSettingsModule} from './account-page/profile/profile-settings/profile-settings.module';
import {AdminConfigModule} from './admin-page/admin-config/admin-config.module';
import {AdminUsersModule} from './admin-page/admin-users/admin-users.module';
import {ManageSchedulePageModule} from 'components/pages/manage-schedule-page/manage-schedule-page.module';
import {SessionListModule} from 'components/pages/session-list/session-list.module';
import {ParticipantListModule} from 'components/pages/participant-list/participant-list.module';
import {SessionListComponent} from 'components/pages/session-list/session-list.component';
import {ReservationListComponent} from 'components/pages/reservation-list/reservation-list.component';
import {ReservationListModule} from 'components/pages/reservation-list/reservation-list.module';
import {NotificationSendingComponent} from './notification-sending/notification-sending.component';
import {PaymentConfirmedPageComponent} from './payment-confirmed-page/payment-confirmed-page.component';
import {PaymentConfirmedPageModule} from 'components/pages/payment-confirmed-page/payment-confirmed-page.module';
import {ErrorPageComponent} from 'components/pages/error-page/error-page.component';
import {ErrorPageModule} from 'components/pages/error-page/error-page.module';

export const Pages = {
  AccountPageComponent,
  SchedulePageComponent,
  MainPageComponent,
  RegisterPageComponent,
  LoginPageComponent,
  ShopPageComponent,
  AdminPageComponent,
  AccountNotificationsComponent,
  AccountSettingsComponent,
  ProfileAddComponent,
  ProfileSettingsComponent,
  AdminConfigComponent,
  AdminUsersComponent,
  ManageSchedulePageComponent,
  SessionListComponent,
  ReservationListComponent,
  NotificationSendingComponent,
  PaymentConfirmedPageComponent,
  ErrorPageComponent
};

@NgModule({
  imports: [
    AccountPageModule,
    SchedulePageModule,
    MainPageModule,
    RegisterPageModule,
    LoginPageModule,
    ShopPageModule,
    AdminPageModule,
    AccountNotificationsModule,
    AccountSettingsModule,
    ProfileAddModule,
    ProfileSettingsModule,
    AdminConfigModule,
    AdminUsersModule,
    ManageSchedulePageModule,
    SessionListModule,
    ParticipantListModule,
    ReservationListModule,
    PaymentConfirmedPageModule,
    ErrorPageModule
  ],
  declarations: []
})
export class PagesModule {
}
