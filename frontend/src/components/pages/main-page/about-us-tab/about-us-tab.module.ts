import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsTabComponent } from './about-us-tab.component';
import { FullArticleComponent } from './full-article/full-article.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule
  ],
  declarations: [AboutUsTabComponent, FullArticleComponent],
  exports: [AboutUsTabComponent]
})
export class AboutUsTabModule { }
