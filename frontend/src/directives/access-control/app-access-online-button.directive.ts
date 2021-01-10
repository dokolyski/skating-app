import { Component, Directive, EmbeddedViewRef, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { OnlineGuard } from 'guards/Online.guard';

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
