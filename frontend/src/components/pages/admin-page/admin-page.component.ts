import { Component, OnDestroy } from '@angular/core';
import { isMobile } from 'common/functions/mobile-check';
import * as PATH from 'assets/config/url.json';
import { TranslateService } from '@ngx-translate/core';
import { tap, delay } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnDestroy {
  PATH = PATH['default'];
  isMobile = isMobile();
  render: boolean = false;
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
