import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import * as PATH from 'assets/config/url.json';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  path = PATH['default'];

  constructor(private sanitizer: DomSanitizer,
              private matIconRegistry: MatIconRegistry) {
    this.matIconRegistry.addSvgIcon(
      `small-logo`,
      sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/small-logo-thick.svg`)
    );
  }

  ngOnInit(): void {
  }

}
