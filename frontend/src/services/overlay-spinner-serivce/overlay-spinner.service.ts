import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverlaySpinnerService {

  overlaySpinnerVisibility = new EventEmitter<boolean>();

}
