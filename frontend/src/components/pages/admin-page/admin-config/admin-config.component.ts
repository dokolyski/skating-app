import { Component, OnInit } from '@angular/core';
import { PaymentTable } from 'api/rest-models/config-models';
import { RestService } from 'services/rest-service/Rest.service';
import { CONFIG } from 'api/rest-types';
import * as REST_PATH from 'api/rest-url.json';
import * as REST_CONFIG from 'assets/config/config.rest.json';
import { Col } from 'components/common/interactive-table/interactive-table.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminConfigDialogEditComponent } from './admin-config-dialog-edit/admin-config-dialog-edit.component';
import { ArraySubject } from 'common/classes/array-subject';
import { ModalDialog } from 'common/classes/modal-dialog';

@Component({
  selector: 'app-admin-config',
  templateUrl: './admin-config.component.html',
  styleUrls: ['./admin-config.component.css']
})
export class AdminConfigComponent implements OnInit {
  private dialog = new ModalDialog(AdminConfigDialogEditComponent, this.matDialog);
  private originalFbLink: string;
  private originalData: PaymentTable;

  fbLink: string;
  cols: Col[];
  rows = new ArraySubject<any>();

  constructor(
    private matDialog: MatDialog,
    private rest: RestService) { }

  ngOnInit() {
    this.rest.do<CONFIG.GET.OUTPUT>(REST_PATH.CONFIG.GET, { templateParamsValues: { key: REST_CONFIG.price_table } })
      .subscribe({
        next: (data: PaymentTable) => {
          this.rows.setDataCopy(this.originalData = data);
          this.initCols();
        },
        // TODO: error: (error: RestError) => this.handleErrors(error)
      });

    this.rest.do<CONFIG.GET.OUTPUT>(REST_PATH.CONFIG.GET, { templateParamsValues: { key: REST_CONFIG.fb_link } })
      .subscribe({
        next: (data: string) => this.fbLink = this.originalFbLink = data,
        // TODO: error: (error: RestError) => this.handleErrors(error)
      });
  }

  onAdd() {
    this.dialog.open({required_money: null, points: null})
    .subscribe(data => {
      if(data) {
        if(this.checkDuplicates(data)) {
          alert('Duplikat');
        } else {
          this.rows.push(data);
        }
      }
    });
  }

  onEdit(rownum: number) {
    const {required_money, points} = this.rows.getIndexCopy(rownum);
    this.dialog.open({required_money, points})
    .subscribe(data => {
      if(data) {
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
        next: () => this.originalData = this.rows.getDataCopy()
        // TODO: error: (error: RestError) => this.handleErrors(error)
      });

    this.rest.do<CONFIG.EDIT.INPUT>(REST_PATH.CONFIG.EDIT, { templateParamsValues: { key: REST_CONFIG.fb_link }, body: this.fbLink })
      .subscribe({
        next: () => this.originalFbLink = this.fbLink
        // TODO: error: (error: RestError) => this.handleErrors(error)
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
    this.cols = [{
      name: 'points',
      label: 'Points',
    },
    {
      name: 'required_money',
      label: 'Money',
    }
  ];
  }
}
