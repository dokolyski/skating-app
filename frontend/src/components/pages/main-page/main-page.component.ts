import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {urls} from 'assets/config/urls';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  urls = urls;
  tabIndex = 0;

  changeTab(event: MatTabChangeEvent) {
    this.tabIndex = event.index;
  }
}
