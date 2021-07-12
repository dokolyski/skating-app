import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { AboutUsTabModule } from './about-us-tab/about-us-tab.module';
import { NewsTabModule } from './news-tab/news-tab.module';
import { TranslateModule } from '@ngx-translate/core';
import { TabRouterOutletModule } from 'components/common/tab-router-outlet/tab-router-outlet.module';

@NgModule({
    imports: [
        CommonModule,
        MatTabsModule,
        MatIconModule,
        AboutUsTabModule,
        NewsTabModule,
        TranslateModule,
        TabRouterOutletModule
    ],
    declarations: [
        MainPageComponent,
    ],
  exports: [MainPageComponent]
})
export class MainPageModule { }
