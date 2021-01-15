import { Directive, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'services/auth-service/auth.service';
import { map } from 'rxjs/operators';

/**
 * @description Create HTMLElement when user has ```organizer`` privilege
 */
@Directive({
  selector: '[appAccessOrganizer]'
})
export class AppAccessOrganizerDirective implements OnDestroy {
  private subs = this.auth.sessionInfo$
    .pipe(
      map(v => v.isOrganizer)
    ).subscribe(ok => {
      if (ok) {
        this.container.createEmbeddedView(this.el);
      } else {
        this.container.clear();
      }
    });

  constructor(
    private el: TemplateRef<any>,
    private container: ViewContainerRef,
    private auth: AuthService) { }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
