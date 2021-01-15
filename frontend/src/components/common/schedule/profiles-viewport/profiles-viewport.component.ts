import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ProfileRequest as Profile } from 'api/rest-models/profile-request';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profiles-viewport',
  templateUrl: './profiles-viewport.component.html',
  styleUrls: ['./profiles-viewport.component.css']
})
export class ProfilesViewportComponent implements OnInit, OnDestroy {
  private s: Subscription;
  @Input() profiles: Profile[];

  displayingItemsNumber = 5;
  firstItem = 0;

  constructor(private breakPointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.s = this.getWidthChangeObserver()
      .subscribe(next => this.handleNextWidth(next));
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }

  move(change: number) {
    const newValue = this.firstItem + change;
    if (newValue >= 0 && newValue <= this.profiles.length - this.displayingItemsNumber) {
      this.firstItem = newValue;
    }
  }

  disableDrop(drag: CdkDrag, drop: CdkDropList): boolean {
    return false;
  }

  private getWidthChangeObserver() {
    return this.breakPointObserver.observe([
      '(max-width: 400px)',
      '(max-width: 550px)',
      '(max-width: 650px)',
      '(max-width: 800px)',
      '(max-width: 1000px)'
    ]);
  }

  private handleNextWidth(next: BreakpointState) {
    if (next.breakpoints['(max-width: 400px)']) {
      this.displayingItemsNumber = 1;
    } else if (next.breakpoints['(max-width: 550px)']) {
      this.displayingItemsNumber = 2;
    } else if (next.breakpoints['(max-width: 650px)']) {
      this.displayingItemsNumber = 3;
    } else if (next.breakpoints['(max-width: 800px)']) {
      this.displayingItemsNumber = 4;
    } else if (next.breakpoints['(max-width: 1000px)']) {
      this.displayingItemsNumber = 5;
    } else {
      this.displayingItemsNumber = 6;
    }

    this.correctGallerySet();
  }

  private correctGallerySet() {
    if (this.displayingItemsNumber > this.profiles.length) {
      this.firstItem = 0;
    } else if (this.firstItem + this.displayingItemsNumber > this.profiles.length) {
      this.firstItem += this.displayingItemsNumber - this.profiles.length;
    }
  }

}
