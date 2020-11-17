import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthService } from 'services/auth-service/Auth.service';
import { LanguageService } from 'services/language-service/Language.service';
import { LanguageErrorService } from 'services/languageError-service/LanguageError.service';
import { PagesModule } from 'components/pages/pages';
import { RestService } from 'services/rest-service/Rest.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    PagesModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AuthService,
    LanguageService,
    LanguageErrorService,
    RestService,
    /* INJECTED CONSTANTS */
    { provide: 'language', useValue: environment.language },
    { provide: 'path-languages', useValue: 'languages'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
