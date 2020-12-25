import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from 'environments/environment';

import { PagesModule } from 'components/pages/pages';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig } from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SchedulePageModule } from '../pages/schedule-page/schedule-page.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AuthService } from 'services/auth-service/Auth.service';
import { LanguageService } from 'services/language-service/Language.service';
import { LanguageErrorService } from 'services/languageError-service/LanguageError.service';
import { RestService } from 'services/rest-service/Rest.service';
import { RestServiceMock } from 'assets/mocks/manual-tests/RestService.mock';
import {MatBadgeModule} from '@angular/material/badge';

const config: SocialAuthServiceConfig = {
  providers: [
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.keys.FACEBOOK)
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(environment.keys.GOOGLE)
    }
  ]
};

export function provideConfig() {
  return config;
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
    MatToolbarModule,
    FlexLayoutModule,
    RouterModule,
    MatDatepickerModule,
    MatBadgeModule
  ],
  declarations: [
    AppComponent,
    MenuComponent
  ],
  providers: [
    RestService,
    HttpClient,
    CookieService,
    SocialAuthService,
    FormBuilder,
    AuthService,
    LanguageService,
    LanguageErrorService,
    { provide: RestService, useClass: RestServiceMock },
    /* INJECTED CONSTANTS */
    { provide: 'language', useValue: environment.language },
    { provide: 'path-languages', useValue: 'languages' },
    { provide: 'SocialAuthServiceConfig', useFactory: provideConfig },
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
