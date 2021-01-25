import {Component} from '@angular/core';
import * as ABOUT_US from 'assets/content/about-us.json';
import {FormatterService} from 'services/formatter-service/formatter.service';
import {MatDialog} from '@angular/material/dialog';
import {FullArticleComponent} from 'components/pages/main-page/about-us-tab/full-article/full-article.component';

@Component({
  selector: 'app-about-us-tab',
  templateUrl: './about-us-tab.component.html',
  styleUrls: ['./about-us-tab.component.css']
})
export class AboutUsTabComponent {
  articles = ABOUT_US['default'];
  maxArticleLength = 250;

  constructor(public formatterService: FormatterService,
              public dialog: MatDialog){
  }

  showFullArticle(article: any, img_href: string) {
    this.dialog.open(FullArticleComponent, { data: {article, img_href} });
  }
}
