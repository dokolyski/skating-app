import { AfterViewInit, Component } from '@angular/core';
import { NewsService } from 'services/news-service/news.service';

@Component({
  selector: 'app-news-tab',
  templateUrl: './news-tab.component.html',
  styleUrls: ['./news-tab.component.css']
})
export class NewsTabComponent implements AfterViewInit {
  constructor(private news: NewsService) {
    this.news.fetchNews();
  }

  ngAfterViewInit() {
    this.news.fetchNews();
  }
}
