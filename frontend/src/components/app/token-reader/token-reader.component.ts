import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from 'services/auth-service/auth.service';
import {of} from 'rxjs';
import {redirectToMain} from 'common/functions/page-redirect';

@Component({
  selector: 'app-token-reader',
  templateUrl: './token-reader.component.html',
  styleUrls: ['./token-reader.component.css']
})
export class TokenReaderComponent {

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
    this.activatedRoute.queryParams.subscribe(params => {
      authService.login(of(JSON.parse(params['response']))).subscribe(() => {
        redirectToMain();
      });
    });
  }
}
