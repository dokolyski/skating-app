import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'environments/environment';

import { PagesModule } from 'components/pages/pages';
import { HttpClientModule } from '@angular/common/http';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
}

export function provideConfig() {
  return config;
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    PagesModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    /* INJECTED CONSTANTS */
    { provide: 'language', useValue: environment.language },
    { provide: 'path-languages', useValue: 'languages'},
    { provide: 'SocialAuthServiceConfig', useFactory: provideConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
