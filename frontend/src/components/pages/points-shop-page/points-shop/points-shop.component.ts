import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RestService} from 'services/rest-service/rest.service';
import * as REST_PATH from 'api/rest-url.json';
import {ErrorMessageService} from 'services/error-message-service/error.message.service';
import {PaymentTable} from 'api/rest-models/config-models';
import {PaymentsPoints} from 'api/rest-models/payments-points';
import * as REST_CONFIG from 'assets/config/config.rest.json';
import {ConfigResponse} from 'api/responses/config.dto';
import {ErrorInterceptorService} from 'services/error-interceptor-service/error-interceptor.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-points-shop',
  templateUrl: './points-shop.component.html',
  styleUrls: ['./points-shop.component.css']
})
export class PointsShopComponent implements OnInit {
  readonly displayedColumns = ['points', 'money', 'buy'];
  table: PaymentTable;

  @Output()
  onSubmit = new EventEmitter<void>();

  constructor(
    private rest: RestService,
    private interceptor: ErrorInterceptorService,
    private errorMessageService: ErrorMessageService) { }

  ngOnInit() {
    this.rest.do<ConfigResponse>(REST_PATH.CONFIG.GET, {templateParamsValues: {key: REST_CONFIG.price_table}})
      .subscribe({
        next: (data: ConfigResponse) => this.table = JSON.parse(data.value),
        error: (error: HttpErrorResponse) => this.errorMessageService.handleMessageError(error)
      });
  }

  buy(option: number) {
    const body = this.preparePayload(option);
    //  TODO - potwierdzenie transakcji i przejście do płatności
    this.rest.do(REST_PATH.PAYMENTS.CREATE, {body})
      .subscribe({
        next: () => this.onSubmit.emit(),
        error: (error: HttpErrorResponse) => this.errorMessageService.handleMessageError(error)
      });
  }

  private preparePayload(option: number): PaymentsPoints {
    const payload: PaymentsPoints = new PaymentsPoints();
    payload.option_id = option;
    return payload;
  }
}
