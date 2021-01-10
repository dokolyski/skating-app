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
import { LoggedActionsComponent } from './logged-actions/logged-actions.component';
import { NavbarComponent } from './navbar.component';
import { UnloggedActionsComponent } from './unlogged-actions/unlogged-actions.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

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
        MatTooltipModule,
        TranslateModule
    ],
    declarations: [
        NavbarComponent,
        LoggedActionsComponent,
        UnloggedActionsComponent
    ],
    exports: [NavbarComponent]
})
export class NavbarModule {}
