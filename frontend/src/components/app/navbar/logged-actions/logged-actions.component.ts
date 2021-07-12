import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'services/auth-service/auth.service';
import { redirectToMain } from 'common/functions/page-redirect';
import { Subscription } from 'rxjs';
import {urls} from 'assets/config/urls';

@Component({
  selector: 'app-logged-actions',
  templateUrl: './logged-actions.component.html'
})
export class LoggedActionsComponent implements OnDestroy {
  s: Subscription;
 urls =urls;

  constructor(
    public auth: AuthService) {}

  logout() {
    this.s = this.auth.logout().subscribe(redirectToMain);
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }
}
