import { AccountPageComponent } from 'components/pages/account-page/account-page.component';
import { SchedulePageComponent } from 'components/pages/schedule-page/schedule-page.component';
import { ManageSchedulePageComponent } from 'components/pages/manage-schedule-page/manage-schedule-page.component';
import { MainPageComponent } from 'components/pages/main-page/main-page.component';
import { RegisterPageComponent } from 'components/pages/register-page/register-page.component';
import { LoginPageComponent } from 'components/pages/login-page/login-page.component';
import { ShopPageComponent } from './points-shop-page/shop-page.component';


import { NgModule } from '@angular/core';
import { AccountPageModule } from './account-page/account-page.module';
import { LoginPageModule } from './login-page/login-page.module';
import { MainPageModule } from './main-page/main-page.module';
import { ManageSchedulePageModule } from './manage-schedule-page/manage-schedule-page.module';
import { RegisterPageModule } from './register-page/register-page.module';
import { SchedulePageModule } from './schedule-page/schedule-page.module';
import { ShopPageModule } from './points-shop-page/shop-page.module';

export const Pages = {
    AccountPageComponent,
    SchedulePageComponent,
    ManageSchedulePageComponent,
    MainPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    ShopPageComponent
};

@NgModule({
    imports: [
        AccountPageModule,
        SchedulePageModule,
        ManageSchedulePageModule,
        MainPageModule,
        RegisterPageModule,
        LoginPageModule,
        ShopPageModule
    ]
})
export class PagesModule {}
