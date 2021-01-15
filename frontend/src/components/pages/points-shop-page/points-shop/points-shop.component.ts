import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RestService } from 'services/rest-service/rest.service';
import { CONFIG, PAYMENTS } from 'api/rest-types';
import { RestError } from 'api/rest-error';
import { ErrorMessageService, TranslatedErrors } from 'services/error-message-service/error.message.service';
import { PaymentTable } from 'api/rest-models/config-models';
import { PaymentsPoints } from 'api/rest-models/payments-points';
import { ErrorInterceptorService } from 'services/error-interceptor-service/error-interceptor.service';
import * as REST_PATH from 'api/rest-url.json';
import * as REST_CONFIG from 'assets/config/config.rest.json';

/**
 * @description Allow user to buy points, informations are represented inside table.
 */
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
    this.rest.do<CONFIG.GET.OUTPUT>(REST_PATH.CONFIG.GET, { templateParamsValues: { key: REST_CONFIG.price_table } })
    .subscribe({
      next: (data: PaymentTable) => this.table = data,
      error: (error: RestError) => this.handleErrors(error)
    });
  }

  buy(option: number) {
    const body = this.preparePayload(option);
    this.rest.do(REST_PATH.PAYMENTS.BUY_POINTS, { body })
    .subscribe({
      next: () => this.onSubmit.emit(),
      error: (error: RestError) => this.handleErrors(error)
    });
  }

  private preparePayload(option: number): PAYMENTS.BUY_POINTS.INPUT {
    const payload: PAYMENTS.BUY_POINTS.INPUT = new PaymentsPoints();
    payload.option_id = option;
    return payload;
  }

  private handleErrors(errors: RestError) {
    this.errorMessageService.getErrorsStrings(errors)
      .subscribe((translation: TranslatedErrors) => {
        if (translation.message) {
          this.interceptor.error.emit(translation.message);
        }
      });
  }
}
