import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { isMobile } from 'common/functions/mobile-check';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  isMobile = isMobile();
  tabIndex = 0;
  
  changeTab(event: MatTabChangeEvent) {
    this.tabIndex = event.index;
  }
}
