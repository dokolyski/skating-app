import {Component, OnInit} from '@angular/core';
import {RestService} from 'services/rest-service/rest.service';
import {UserResponse} from 'api/responses/user.dto';
import {restUrls} from 'api/rest-urls';
import {AuthService} from 'services/auth-service/auth.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-points-amount',
  templateUrl: './points-amount.component.html',
  styleUrls: ['./points-amount.component.css']
})
export class PointsAmountComponent implements OnInit {
  amount: any;

  constructor(private authService: AuthService,
              private restService: RestService) {
  }

  ngOnInit(): void {
    this.authService.sessionInfo$
      .pipe(
        first()
      ).subscribe(token => {
      this.restService.do<UserResponse>(restUrls.USERS.GET, {templateParamsValues: {id: token.uid.toString()}}).subscribe(value => {
        this.amount = value.pointsAmount;
      });
    });
  }

}
