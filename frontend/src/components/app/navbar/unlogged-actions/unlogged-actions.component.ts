import { Component } from '@angular/core';
import { LanguageService } from 'services/language-service/Language.service';
import * as PATH from 'assets/config/url.json';
import { OnlineGuard } from 'guards/Online.guard';

@Component({
  selector: 'app-unlogged-actions',
  templateUrl: './unlogged-actions.component.html'
})
export class UnloggedActionsComponent {
  online = OnlineGuard.isOnline();
  path = PATH['default'];

  constructor(public language: LanguageService) {}
}
