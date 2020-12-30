import {Injectable} from '@angular/core';

declare var window: any;

/**
 * @description Fetch news from facebook
 */
@Injectable({
    providedIn: 'root'
})
export class NewsService {
  fetchNews() {
    window.FB.XFBML.parse();
  }
}
