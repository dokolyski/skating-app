import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from 'environments/environment';

import {PagesModule} from 'components/pages/pages.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {SchedulePageModule} from '../pages/schedule-page/schedule-page.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CookieService} from 'ngx-cookie-service';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {AuthService} from 'services/auth-service/auth.service';
import {MatBadgeModule} from '@angular/material/badge';
import {ReservationsService} from 'services/reservations-service/reservations.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NewsService} from 'services/news-service/news.service';
import {NavbarModule} from './navbar/navbar.module';
import {AdminConfigDialogEditComponent} from 'components/pages/admin-page/admin-config/admin-config-dialog-edit/admin-config-dialog-edit.component';
import {MatDialogModule} from '@angular/material/dialog';
import {InputsModule} from 'components/common/inputs/inputs.module';
import {AdminUsersDialogEditComponent} from 'components/pages/admin-page/admin-users/admin-users-dialog-edit/admin-users-dialog-edit.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AccessControlModule} from 'directives/access-control/access-control.module';
import {RestService} from 'services/rest-service/rest.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ErrorMessageService} from 'services/error-message-service/error.message.service';
import {ErrorInterceptorService} from 'services/error-interceptor-service/error-interceptor.service';
import {TokenReaderComponent} from './token-reader/token-reader.component';
import {LoadingSpinnerModule} from 'components/common/loading-spinner/loading-spinner.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
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
        NavbarModule,
        MatBadgeModule,
        MatDialogModule,
        ReactiveFormsModule,
        InputsModule,
        MatCheckboxModule,
        FormsModule,
        AccessControlModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            defaultLanguage: 'pl'
        }),
        LoadingSpinnerModule
    ],
  declarations: [
    AppComponent,
    AdminConfigDialogEditComponent,
    AdminUsersDialogEditComponent,
    TokenReaderComponent
  ],
  providers: [
    RestService,
    HttpClient,
    CookieService,
    FormBuilder,
    AuthService,
    ErrorMessageService,
    ReservationsService,
    MatSnackBar,
    NewsService,
    ErrorInterceptorService,
    { provide: RestService, useClass: RestService },
    /* INJECTED CONSTANTS */
    { provide: 'language', useValue: environment.language },
    { provide: 'path-languages', useValue: 'languages' },
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } }
  ],
  entryComponents: [
    AdminConfigDialogEditComponent,
    AdminUsersDialogEditComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
