import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AccessControlModule } from 'directives/access-control/access-control.module';
import { RouteButtonModule } from 'components/common/route-button/route-button.module';
import { LoggedMenuComponent } from './logged-menu/logged-menu.component';
import { MenuComponent } from './menu.component';
import { UnloggedMenuComponent } from './unlogged-menu/unlogged-menu.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        CommonModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        RouterModule,
        FlexLayoutModule,
        RouteButtonModule,
        MatBadgeModule,
        AccessControlModule,
        MatTooltipModule
    ],
    declarations: [
        MenuComponent,
        LoggedMenuComponent,
        UnloggedMenuComponent
    ],
    exports: [MenuComponent]
})
export class MenuModule {}
