import { Directive, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { OnlineGuard } from 'guards/Online.guard';

@Directive({
  selector: '[appAccessOnline]',

})
export class AppAccessOnlineDirective implements OnDestroy {
  private subs = OnlineGuard.isOnline()
    .subscribe(ok => {
      if (ok) {
        this.container.createEmbeddedView(this.el);
      } else {
        this.container.clear();
      }
    });

  constructor(
    private el: TemplateRef<any>,
    private container: ViewContainerRef) { }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
