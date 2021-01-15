import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * @description Follows ```url```, set green color when ```routerLink``` is same as ```url```. 
 */
@Component({
  selector: 'app-route-button[routerLink][ariaLabel]',
  templateUrl: './route-button.component.html',
  styleUrls: ['./route-button.component.css'],
  viewProviders: [RouteButtonComponent]
})
export class RouteButtonComponent implements OnInit, OnDestroy {
  @Input()
  routerLink: string;
  @Input()
  ariaLabel: string;
  @Input()
  tooltip: string;

  icon: boolean;
  activated: boolean;

  private s: Subscription;

  constructor(private router: Router) {
    this.s = router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
      this.checkActivation(event.url);
    });
  }

  ngOnInit() {
    this.checkActivation(this.router.url);
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  private checkActivation(url: string) {
    this.activated = url.match(`${this.routerLink}`)?.[0] as unknown as boolean ?? false;
  }
}
