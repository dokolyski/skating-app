import { Directive, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'services/auth-service/auth.service';
import { map } from 'rxjs/operators';

/**
 * @description Create HTMLElement when user has ```admin`` privilege
 */
@Directive({
  selector: '[appAccessAdmin]'
})
export class AppAccessAdminDirective implements OnDestroy {
  private subs = this.auth.sessionInfo$
    .pipe(
      map(v => v.isAdmin)
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
