import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appTabSubpage]'
})
export class TabSubpageDirective {
  @Input()
  label: string;

  @Input()
  url: string;
 }
