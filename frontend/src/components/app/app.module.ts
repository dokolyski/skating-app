import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from 'environments/environment';

import {PagesModule} from 'components/pages/pages';
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
import {FormBuilder} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {AuthService} from 'services/auth-service/Auth.service';
import {RestService} from 'services/rest-service/Rest.service';
import {RestServiceMock} from 'assets/mocks/manual-tests/RestService.mock';
import {MatBadgeModule} from '@angular/material/badge';
import {ReservationsService} from 'services/reservations-service/reservations.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NewsService} from 'services/news-service/News.service';
import {MenuModule} from './menu/menu.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ErrorMessageService} from 'services/error-message-service/error.message.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'pl'
    })
  ],
  declarations: [
    AppComponent,
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
    { provide: RestService, useClass: RestServiceMock },
    /* INJECTED CONSTANTS */
    { provide: 'language', useValue: environment.language },
    { provide: 'path-languages', useValue: 'languages' },
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
