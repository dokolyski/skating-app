import { AccountPageComponent } from 'components/pages/account-page/account-page.component';
import { SchedulePageComponent } from 'components/pages/schedule-page/schedule-page.component';
import { MainPageComponent } from 'components/pages/main-page/main-page.component';
import { RegisterPageComponent } from 'components/pages/register-page/register-page.component';
import { LoginPageComponent } from 'components/pages/login-page/login-page.component';
import { ShopPageComponent } from './points-shop-page/shop-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

import { NgModule } from '@angular/core';
import { AccountPageModule } from './account-page/account-page.module';
import { LoginPageModule } from './login-page/login-page.module';
import { MainPageModule } from './main-page/main-page.module';
import { RegisterPageModule } from './register-page/register-page.module';
import { SchedulePageModule } from './schedule-page/schedule-page.module';
import { ShopPageModule } from './points-shop-page/shop-page.module';
import { AdminPageModule } from './admin-page/admin-page.module';

export const Pages = {
    AccountPageComponent,
    SchedulePageComponent,
    MainPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    ShopPageComponent,
    AdminPageComponent
};

@NgModule({
    imports: [
        AccountPageModule,
        SchedulePageModule,
        MainPageModule,
        RegisterPageModule,
        LoginPageModule,
        ShopPageModule,
        AdminPageModule
    ]
})
export class PagesModule {}
