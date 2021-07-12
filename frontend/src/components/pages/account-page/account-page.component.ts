import { Component, OnDestroy, OnInit } from '@angular/core';
import { isMobile } from 'common/functions/mobile-check';
import { delay, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { of, Subscription } from 'rxjs';
import {urls} from 'assets/config/urls';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit, OnDestroy {
 urls =urls;
  render = false;
  s: Subscription;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.s = this.translate.onLangChange
      .pipe(
        tap(() => this.render = false),
        delay(100)
      ).subscribe(() => {
        this.render = true;
      });

    of(null)
    .pipe(
      delay(100)
    ).subscribe(() => {
      this.render = true;
    });
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }
}
