import {AfterViewInit, Component, OnInit} from '@angular/core';
declare var window: any;

@Component({
  selector: 'app-news-tab',
  templateUrl: './news-tab.component.html',
  styleUrls: ['./news-tab.component.css']
})
export class NewsTabComponent implements AfterViewInit {

  constructor() {
  }

  ngAfterViewInit(): void {
    window.FB.XFBML.parse();
  }
}
