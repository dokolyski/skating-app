import { Component, OnInit, Input } from '@angular/core';
import {OverlaySpinnerService} from 'services/overlay-spinner-serivce/overlay-spinner.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor(private service: OverlaySpinnerService) { }
  visible = false;

  ngOnInit() {
    this.service.overlaySpinnerVisibility.subscribe(value => this.visible = value);
  }

}
