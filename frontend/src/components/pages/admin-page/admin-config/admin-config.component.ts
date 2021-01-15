import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaymentTable } from 'api/rest-models/config-models';
import { RestService } from 'services/rest-service/rest.service';
import { CONFIG } from 'api/rest-types';
import { Col } from 'components/common/interactive-table/interactive-table.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminConfigDialogEditComponent } from './admin-config-dialog-edit/admin-config-dialog-edit.component';
import { ArraySubject } from 'common/classes/array-subject';
import { ModalDialog } from 'common/classes/modal-dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, zip } from 'rxjs';
import { RestError } from 'api/rest-error';
import { ErrorInterceptorService } from 'services/error-interceptor-service/error-interceptor.service';
import { ErrorMessageService, TranslatedErrors } from 'services/error-message-service/error.message.service';
import * as REST_PATH from 'api/rest-url.json';
import * as REST_CONFIG from 'assets/config/config.rest.json';
import { first } from 'rxjs/operators';

type DialogDataType = { 
  required_money: number, 
  points: number 
};

/***
 * @description Show configuration settings and allow to change ```Facebook``` page url, ```Price table```. 
 */
@Component({
  selector: 'app-admin-config',
  templateUrl: './admin-config.component.html',
  styleUrls: ['./admin-config.component.css']
})
export class AdminConfigComponent implements OnInit, OnDestroy {
  private s: Subscription;
  private dialog = new ModalDialog<DialogDataType>(AdminConfigDialogEditComponent, this.matDialog);
  private originalFbLink: string;
  private originalData: PaymentTable;

  fbLink: string;
  cols: Col[];
  rows = new ArraySubject<any>();

  constructor(
    private translate: TranslateService,
    private matDialog: MatDialog,
    private interceptor: ErrorInterceptorService,
    private errorMessageService: ErrorMessageService,
    private rest: RestService) { }

  ngOnInit() {
    this.rest.do<CONFIG.GET.OUTPUT>(REST_PATH.CONFIG.GET, { templateParamsValues: { key: REST_CONFIG.price_table } })
      .subscribe({
        next: (data: PaymentTable) => {
          this.rows.setDataCopy(this.originalData = data);
          this.initCols();
        },
        error: (error: RestError) => this.handleErrors(error)
      });

    this.rest.do<CONFIG.GET.OUTPUT>(REST_PATH.CONFIG.GET, { templateParamsValues: { key: REST_CONFIG.fb_link } })
      .subscribe({
        next: (data: string) => this.fbLink = this.originalFbLink = data,
        error: (error: RestError) => this.handleErrors(error)
      });
  }

  ngOnDestroy() {
    this.s?.unsubscribe();
  }

  onAdd() {
    this.dialog.open({ required_money: null, points: null })
      .subscribe(data => {
        if (data) {
          if (this.checkDuplicates(data)) {
            this.translate.get('errors.messages.DUPLICATE')
            .pipe(
              first()
            ).subscribe(e => this.interceptor.error.emit(e))
          } else {
            this.rows.push(data);
          }
        }
      });
  }

  onEdit(rownum: number) {
    const { required_money, points } = this.rows.getIndexCopy(rownum);
    this.dialog.open({ required_money, points })
      .subscribe(data => {
        if (data) {
          this.rows.setIndex(data, rownum);
        }
      });
  }

  onDelete(rownum: number) {
    this.rows.deleteIndex(rownum);
  }

  saveData() {
    this.rest.do<CONFIG.EDIT.INPUT>(REST_PATH.CONFIG.EDIT, { templateParamsValues: { key: REST_CONFIG.price_table }, body: this.rows })
      .subscribe({
        next: () => this.originalData = this.rows.getDataCopy(),
        error: (error: RestError) => this.handleErrors(error)
      });

    this.rest.do<CONFIG.EDIT.INPUT>(REST_PATH.CONFIG.EDIT, { templateParamsValues: { key: REST_CONFIG.fb_link }, body: this.fbLink })
      .subscribe({
        next: () => this.originalFbLink = this.fbLink,
        error: (error: RestError) => this.handleErrors(error)
      });
  }

  cancelData() {
    this.fbLink = this.originalFbLink;
    this.rows.setDataCopy(this.originalData);
  }

  private checkDuplicates(data): boolean {
    const index = this.rows.findIndex(v => v.required_money === data.required_money && v.points === data.points);
    return index > -1 ? true : false;
  }

  private initCols() {
    this.s = zip(
      this.translate.get('pages.admin.config.form.columns.POINTS'),
      this.translate.get('pages.admin.config.form.columns.REQ_MONEY')
    ).subscribe(t => {
      this.cols = [{
        name: 'points',
        label: t[0]
      },
      {
        name: 'required_money',
        label: t[1]
      }
      ];
    });
  }

  private handleErrors(error: RestError) {
    this.errorMessageService.getErrorsStrings(error)
      .subscribe((translation: TranslatedErrors) => {
        if (translation.message) {
          this.interceptor.error.emit(translation.message);
        }
      });
  }
}
