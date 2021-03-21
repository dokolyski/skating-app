import { Injectable } from '@angular/core';
import {OverlaySpinnerService} from 'services/overlay-spinner-serivce/overlay-spinner.service';

declare var window: any;

/**
 * @description Fetch news from facebook
 */
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(public spinnerService: OverlaySpinnerService) {
  }

  private static hideSpinner(that: NewsService) {
     that.spinnerService.overlaySpinnerVisibility.emit(false);
  }

  fetchNews() {
    window.FB.XFBML.parse(undefined, () => this.spinnerService.overlaySpinnerVisibility.emit(false));
  }
}
