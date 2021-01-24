import {AfterViewInit, Component} from '@angular/core';
import {NewsService} from 'services/news-service/news.service';
import {RestService} from 'services/rest-service/rest.service';
import {ConfigResponse} from 'api/responses/config.dto';
import * as REST_CONFIG from 'assets/config/config.rest.json';
import * as REST_PATH from 'api/rest-url.json';

@Component({
  selector: 'app-news-tab',
  templateUrl: './news-tab.component.html',
  styleUrls: ['./news-tab.component.css']
})
export class NewsTabComponent implements AfterViewInit {

  constructor(private news: NewsService,
              private restService: RestService) {
  }

  ngAfterViewInit() {
    this.restService.do<ConfigResponse>(REST_PATH.CONFIG.GET, {templateParamsValues: {key: REST_CONFIG.fb_link}}).subscribe(next => {
      document.querySelector('fb-page').attributes['href'].value = next.value;
      this.news.fetchNews();
    });
  }
}
