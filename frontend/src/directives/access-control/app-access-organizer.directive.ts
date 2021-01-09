import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'services/auth-service/Auth.service';

@Directive({
  selector: '[appAccessOrganizer]'
})
export class AppAccessOrganizerDirective {
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
