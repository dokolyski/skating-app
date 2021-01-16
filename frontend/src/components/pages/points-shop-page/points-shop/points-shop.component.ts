import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RestService} from 'services/rest-service/Rest.service';
import * as REST_PATH from 'api/rest-url.json';
import { RestError } from 'api/rest-error';
import { ErrorMessageService, TranslatedErrors } from 'services/error-message-service/error.message.service';
import { PaymentTable } from 'api/rest-models/config-models';
import { PaymentsPoints } from 'api/rest-models/payments-points';
import * as REST_CONFIG from 'assets/config/config.rest.json';
import {ConfigResponse} from 'api/responses/config.dto';

@Component({
  selector: 'app-points-shop',
  templateUrl: './points-shop.component.html',
  styleUrls: ['./points-shop.component.css']
})
export class PointsShopComponent implements OnInit {

  constructor(
    private rest: RestService,
    private errorMessageService: ErrorMessageService) {
  }
  readonly displayedColumns = ['points', 'money', 'buy'];
  table: PaymentTable;

  @Output()
  onSubmit = new EventEmitter<void>();
  @Output()
  onError = new EventEmitter<string>();

  private static preparePayload(option: number): PaymentsPoints {
    const payload: PaymentsPoints = new PaymentsPoints();
    payload.option_id = option;
    return payload;
  }

  ngOnInit() {
    this.rest.do<ConfigResponse[]>(REST_PATH.CONFIG.GET, {templateParamsValues: {key: REST_CONFIG.price_table}})
      .subscribe({
        next: (data: ConfigResponse[]) => this.table = data.map(value => ({
          required_money: parseInt(value.key, 0),
          points: parseInt(value.value, 0)
        })),
        error: (error: RestError) => this.handleErrors(error)
      });
  }

  buy(option: number) {
    const body = PointsShopComponent.preparePayload(option);
    //  TODO - potwierdzenie transakcji i przejście do płatności
    this.rest.do(REST_PATH.PAYMENTS.CREATE, {body})
      .subscribe({
        next: () => this.onSubmit.emit(),
        error: (error: RestError) => this.handleErrors(error)
      });
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
