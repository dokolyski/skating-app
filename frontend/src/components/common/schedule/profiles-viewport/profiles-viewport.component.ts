import {Component, Input, OnInit} from '@angular/core';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ProfileResponse} from 'api/responses/profile.dto';

@Component({
  selector: 'app-profiles-viewport',
  templateUrl: './profiles-viewport.component.html',
  styleUrls: ['./profiles-viewport.component.css']
})
export class ProfilesViewportComponent implements OnInit {

  @Input() profiles: ProfileResponse[];

  displayingItemsNumber = 5;

  firstItem = 0;

  constructor(private breakPointObserver: BreakpointObserver) {
  }

  private correctGallerySet() {
    if (this.displayingItemsNumber > this.profiles.length) {
      this.firstItem = 0;
    } else if (this.firstItem + this.displayingItemsNumber > this.profiles.length) {
      this.firstItem += this.displayingItemsNumber - this.profiles.length;
    }
  }

  ngOnInit(): void {
    this.breakPointObserver.observe([
      '(max-width: 400px)',
      '(max-width: 550px)',
      '(max-width: 650px)',
      '(max-width: 800px)',
      '(max-width: 1000px)']).subscribe(next => {
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
    });
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

}
