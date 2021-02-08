import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestService} from 'services/rest-service/rest.service';
import * as REST_PATH from 'api/rest-url.json';
import {NotificationRequest} from 'api/requests/notification.dto';
import {AuthService} from 'services/auth-service/auth.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-notification-sending',
  templateUrl: './notification-sending.component.html',
  styleUrls: ['./notification-sending.component.css']
})
export class NotificationSendingComponent implements OnInit, OnDestroy {
  title = '';
  description = '';
  private destroySubject = new Subject();

  constructor(private rest: RestService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  sendNotification() {
    this.authService.sessionInfo$.pipe(takeUntil(this.destroySubject)).subscribe(sessionInfo => {
      this.rest.do(REST_PATH.NOTIFICATIONS.CREATE, {
        body: {
          title: this.title,
          description: this.description,
          status: 'ENABLED',
          show_date: new Date(Date.now()),
          expiration_date: new Date(),
          owner_id: sessionInfo.uid
        } as NotificationRequest
      }).subscribe(
        next => {
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }
}
