import { AfterViewInit, ChangeDetectorRef, Component, ContentChildren, OnDestroy, QueryList } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TabSubpageDirective } from './tab-subpage.directive';
import { filter, takeUntil } from 'rxjs/operators';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject } from 'rxjs';

/**
 * @description Insert subpages into ```MatTab```, change tab to ```url``` related ```component```.
 */
@Component({
  selector: 'app-tab-router-outlet',
  templateUrl: './tab-router-outlet.component.html',
  styleUrls: ['./tab-router-outlet.component.css']
})
export class TabRouterOutletComponent implements AfterViewInit, OnDestroy {
  destructor = new Subject();
  components: { label: string, url: string }[] = [];
  tabIndex: number;

  @ContentChildren(TabSubpageDirective)
  subpages: QueryList<TabSubpageDirective>;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.initComponents();
    this.setCorrectTab();

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destructor)
      )
      .subscribe(() => this.setCorrectTab());

    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.destructor.next();
  }

  changeTab(event: MatTabChangeEvent) {
    this.router.navigateByUrl(this.components[event.index].url);
    this.tabIndex = event.index;
  }

  private initComponents() {
    this.components = this.subpages.map(e => ({
      label: e.label,
      url: e.url
    }));
  }

  private setCorrectTab() {
    const indx = this.components.findIndex(({ url }) => '/' + url === this.router.url);
    this.tabIndex = indx > -1 ? indx : 0;
  }
}
