import { AccountPageComponent } from 'components/pages/account-page/account-page.component';
import { ProfilesPageComponent } from 'components/pages/profiles-page/profiles-page.component';
import { SchedulePageComponent } from 'components/pages/schedule-page/schedule-page.component';
import { SessionsPageComponent } from 'components/pages/sessions-page/sessions-page.component';
import { ManageSchedulePageComponent } from 'components/pages/manage-schedule-page/manage-schedule-page.component';
import { AddSessionPageComponent } from 'components/pages/add-session-page/add-session-page.component';
import { MainPageComponent } from 'components/pages/main-page/main-page.component';
import { NewsPageComponent } from 'components/pages/news-page/news-page.component';
import { AboutUsPageComponent } from 'components/pages/about-us-page/about-us-page.component';
import { RegisterPageComponent } from 'components/pages/register-page/register-page.component';
import { LoginPageComponent } from 'components/pages/login-page/login-page.component';

import { NgModule } from '@angular/core';
import { AboutUsPageModule } from './about-us-page/about-us-page.module';
import { AccountPageModule } from './account-page/account-page.module';
import { AddSessionPageModule } from './add-session-page/add-session-page.module';
import { LoginPageModule } from './login-page/login-page.module';
import { MainPageModule } from './main-page/main-page.module';
import { ManageSchedulePageModule } from './manage-schedule-page/manage-schedule-page.module';
import { NewsPageModule } from './news-page/news-page.module';
import { ProfilesPageModule } from './profiles-page/profiles-page.module';
import { RegisterPageModule } from './register-page/register-page.module';
import { SchedulePageModule } from './schedule-page/schedule-page.module';
import { SessionsPageModule } from './sessions-page/sessions-page.module';

export const Pages = {
    AccountPageComponent,
    ProfilesPageComponent,
    SchedulePageComponent,
    SessionsPageComponent,
    ManageSchedulePageComponent,
    AddSessionPageComponent,
    MainPageComponent,
    NewsPageComponent,
    AboutUsPageComponent,
    RegisterPageComponent,
    LoginPageComponent
}

@NgModule({
    imports: [
        AccountPageModule,
        ProfilesPageModule,
        SchedulePageModule,
        SessionsPageModule,
        ManageSchedulePageModule,
        AddSessionPageModule,
        MainPageModule,
        NewsPageModule,
        AboutUsPageModule,
        RegisterPageModule,
        LoginPageModule
    ]
})
export class PagesModule {}