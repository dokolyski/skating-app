import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'environments/environment';
import { NewBookingComponent } from 'components/pages/new-booking/new-booking.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'services/Auth.service';
import { LanguageService } from 'services/Language.service';
import { LanguageErrorService } from 'services/LanguageError.service';
import { PagesModule } from 'components/pages/pages';
import { RestService } from 'services/Rest.service';

@NgModule({
  declarations: [
    AppComponent,
    NewBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    PagesModule
  ],
  providers: [
    AuthService,
    LanguageService,
    LanguageErrorService,
    RestService,
    /* INJECTED CONSTANTS */
    { provide: 'language', useValue: environment.language }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
