import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'environments/environment';
import { NewBookingComponent } from 'components/pages/new-booking/new-booking.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppFirebaseModule } from 'components/app-firebase-module/app-firebase-module.module';
import { AuthService } from 'services/AuthService';

@NgModule({
  declarations: [
    AppComponent,
    NewBookingComponent
  ],
  imports: [
    BrowserModule,
    AppFirebaseModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
