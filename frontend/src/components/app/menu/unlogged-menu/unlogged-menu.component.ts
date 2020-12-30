import { Component } from '@angular/core';
import { LanguageService } from 'services/language-service/Language.service';
import * as PATH from 'assets/config/url.json';

@Component({
  selector: 'app-menu-unlogged',
  templateUrl: './unlogged-menu.component.html',
  styleUrls: ['./unlogged-menu.component.css']
})
export class UnloggedMenuComponent {
  path = PATH['default'];

  constructor(public language: LanguageService) {}
}
