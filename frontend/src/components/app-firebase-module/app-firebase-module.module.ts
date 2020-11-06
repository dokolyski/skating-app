import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { NgModule } from '@angular/core';

import { environment } from 'environments/environment';
import { AuthService } from 'services/AuthService';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

@NgModule({
  imports: [AngularFireModule.initializeApp(environment.firebase)],
  providers: [AuthService, AngularFireAuthGuard],
  exports: [AngularFireModule, AngularFireAuthModule],
})
export class AppFirebaseModule {}