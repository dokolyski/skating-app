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

  fbPageAddress: string;

  constructor(private news: NewsService,
              private restService: RestService) {
    this.news.fetchNews();
  }

  ngAfterViewInit() {
    this.restService.do<ConfigResponse>(REST_PATH.CONFIG.GET, {templateParamsValues: {key: REST_CONFIG.fb_link}}).subscribe(next => {
      this.fbPageAddress = next.value;
      this.news.fetchNews();
    });
  }
}
