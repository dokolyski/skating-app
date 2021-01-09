import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-route-button[routerLink][ariaLabel]',
  templateUrl: './route-button.component.html',
  styleUrls: ['./route-button.component.css'],
  viewProviders: [RouteButtonComponent]
})
export class RouteButtonComponent implements OnInit {
  @Input()
  routerLink: string;
  @Input()
  ariaLabel: string;

  icon: boolean;
  activated: boolean;

  constructor(private router: Router) {
    router.events
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

  private checkActivation(url: string) {
    this.activated = url.match(`${this.routerLink}`)?.[0] as unknown as boolean ?? false;
  }
}
