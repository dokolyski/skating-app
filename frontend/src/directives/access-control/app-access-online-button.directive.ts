import { Directive, OnDestroy } from '@angular/core';
import { OnlineGuard } from 'guards/online.guard';
import { MatButton } from '@angular/material/button';

/**
 * @description Set ```disabled``` on ```MatButton`` when ```offline``
 */
@Directive({
  selector: '[appAccessOnlineButton]'
})
export class AppAccessOnlineButtonDirective implements OnDestroy {
  private subs = OnlineGuard.isOnline()
    .subscribe(ok => this.context.disabled = !ok);

  constructor(
    private context: MatButton) { }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
