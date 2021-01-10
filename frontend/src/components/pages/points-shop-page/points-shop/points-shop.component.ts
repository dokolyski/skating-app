import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RestService } from 'services/rest-service/Rest.service';
import * as REST_PATH from 'api/rest-url.json';
import { CONFIG, PAYMENTS } from 'api/rest-types';
import { RestError } from 'api/rest-error';
import { ErrorMessageService, TranslatedErrors } from 'services/error-message-service/error.message.service';
import { PaymentTable } from 'api/rest-models/config-models';
import { PaymentsPoints } from 'api/rest-models/payments-points';
import * as REST_CONFIG from 'assets/config/config.rest.json';

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
  @Output()
  onError = new EventEmitter<string>();

  constructor(
    private rest: RestService,
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
          this.onError.emit(translation.message);
        }
      });
  }
}
