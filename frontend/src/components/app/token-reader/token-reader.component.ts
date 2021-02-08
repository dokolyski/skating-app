import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from 'services/auth-service/auth.service';
import {of} from 'rxjs';
import {redirectToMain} from 'common/functions/page-redirect';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-token-reader',
  templateUrl: './token-reader.component.html',
  styleUrls: ['./token-reader.component.css']
})
export class TokenReaderComponent {

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private translateService: TranslateService,
              snackBar: MatSnackBar) {
    this.activatedRoute.queryParams.subscribe(params => {
      authService.login(of(JSON.parse(params['response']))).subscribe(() => {
        this.translateService.get('success.login').subscribe(message => snackBar.open(message));
        redirectToMain();
      });
    });
  }
}
