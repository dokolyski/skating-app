import {Component, Input, OnInit} from '@angular/core';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import {Profile} from 'api/rest-models/profile';

@Component({
  selector: 'app-profiles-viewport',
  templateUrl: './profiles-viewport.component.html',
  styleUrls: ['./profiles-viewport.component.css']
})
export class ProfilesViewportComponent implements OnInit {

  @Input() profiles: Profile[];

  displayingItemsNumber = 5;

  firstItem = 0;

  constructor() {
  }

  ngOnInit(): void {
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
