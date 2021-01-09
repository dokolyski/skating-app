import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from 'environments/environment';

import { PagesModule } from 'components/pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SchedulePageModule } from '../pages/schedule-page/schedule-page.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AuthService } from 'services/auth-service/Auth.service';
import { LanguageService } from 'services/language-service/Language.service';
import { LanguageErrorService } from 'services/languageError-service/LanguageError.service';
import { RestService } from 'services/rest-service/Rest.service';
import { RestServiceMock } from 'assets/mocks/manual-tests/RestService.mock';
import { MatBadgeModule } from '@angular/material/badge';
import { ReservationsService } from 'services/reservations-service/reservations.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewsService } from 'services/news-service/News.service';
import { MenuModule } from './menu/menu.module';
import { AdminConfigDialogComponent } from 'components/pages/admin-page/admin-config/admin-config-dialog/admin-config-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InputsModule } from 'components/common/inputs/inputs.module';
import { AdminUsersDialogComponent } from 'components/pages/admin-page/admin-users/admin-users-dialog/admin-users-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    PagesModule,
    MatCardModule,
    MatButtonModule,
    SchedulePageModule,
    HttpClientModule,
    MatIconModule,
    FlexLayoutModule,
    RouterModule,
    MatDatepickerModule,
    MenuModule,
    MatBadgeModule,
    MatDialogModule,
    ReactiveFormsModule,
    InputsModule,
    MatCheckboxModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    AdminConfigDialogComponent,
    AdminUsersDialogComponent
  ],
  providers: [
    RestService,
    HttpClient,
    CookieService,
    FormBuilder,
    AuthService,
    LanguageService,
    LanguageErrorService,
    ReservationsService,
    MatSnackBar,
    NewsService,
    { provide: RestService, useClass: RestServiceMock },
    /* INJECTED CONSTANTS */
    { provide: 'language', useValue: environment.language },
    { provide: 'path-languages', useValue: 'languages' },
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
  ],
  entryComponents: [
    AdminConfigDialogComponent,
    AdminUsersDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
