import { Component } from '@angular/core';
import { LanguageService } from 'services/language-service/Language.service';
import * as PATH from 'assets/config/url.json';

@Component({
  selector: 'app-menu-logged',
  templateUrl: './logged-menu.component.html',
  styleUrls: ['./logged-menu.component.css']
})
export class LoggedMenuComponent {
  path = PATH['default'];

  constructor(public language: LanguageService) {}
}
