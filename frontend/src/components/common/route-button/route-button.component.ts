import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-route-button[routerLink][ariaLabel]',
  templateUrl: './route-button.component.html',
  styleUrls: ['./route-button.component.css']
})
export class RouteButtonComponent implements OnInit {
  @Input()
  routerLink: string;
  @Input()
  ariaLabel: string;
  @Input()
  iconName: string = '';
  @Input()
  isBadge: boolean = false;
 
  activated: boolean;

  constructor(private router: Router) {
    router.events
    .pipe(
      filter(event => event instanceof NavigationEnd) 
    )
    .subscribe((event: NavigationEnd) => {
      this.checkActivation(event.url);
    })
  }

  ngOnInit() {
    this.checkActivation(this.router.url);
  }

  private checkActivation(url: string) {
    this.activated = url === this.routerLink;
  }
}
