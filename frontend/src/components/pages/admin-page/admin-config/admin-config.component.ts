import { Component, OnInit } from '@angular/core';
import { PaymentTable } from 'api/rest-models/config-models';
import { RestService } from 'services/rest-service/Rest.service';
import { CONFIG } from 'api/rest-types';
import * as REST_PATH from 'api/rest-url.json';
import * as REST_CONFIG from 'assets/config/config.rest.json';
import { Col } from 'components/common/interactive-table/interactive-table.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminConfigDialogComponent } from './admin-config-dialog/admin-config-dialog.component';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-config',
  templateUrl: './admin-config.component.html',
  styleUrls: ['./admin-config.component.css']
})
export class AdminConfigComponent implements OnInit {
  private dialogRef: MatDialogRef<AdminConfigDialogComponent>;
  private originalFbLink: string;
  private originalData: PaymentTable;

  fbLink: string;
  cols: Col[];
  rows: PaymentTable;

  constructor(
    private dialog: MatDialog,
    private rest: RestService) { }

  ngOnInit() {
    this.rest.do<CONFIG.GET.OUTPUT>(REST_PATH.CONFIG.GET, { templateParamsValues: { key: REST_CONFIG.price_table } })
      .subscribe({
        next: (data: PaymentTable) => {
          this.rows = this.originalData = data;
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
    if(!this.dialogRef) {
      this.dialogRef = this.dialog.open(AdminConfigDialogComponent,   {
        data: {money: null, points: null}
      });

      this.dialogRef.afterClosed()
      .pipe(
        tap(() => this.dialogRef = null),
        filter(v => v)
      ).subscribe(({save, data}) => {
        if(save) {
          this.rows.push(data);
        }
      });
    }
  }

  onEdit(rownum: number) {
    if(!this.dialogRef) {
      const {required_money: money, points} = this.rows[rownum];
      this.dialogRef = this.dialog.open(AdminConfigDialogComponent,   {
        data: {money, points}
      });

      this.dialogRef.afterClosed()
      .pipe(
        tap(() => this.dialogRef = null),
        filter(v => v)
      ).subscribe(({save, data}) => {
        if(save) {
          this.rows[rownum] = data;
        }
      });
    }
  }

  onDelete(rownum: number) {
    this.rows.splice(rownum);
  }

  saveData() {
    this.rest.do<CONFIG.EDIT.INPUT>(REST_PATH.CONFIG.EDIT, { templateParamsValues: { key: REST_CONFIG.price_table }, body: this.rows })
      .subscribe({
        next: () => this.originalData = this.rows
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
    this.rows = this.originalData;
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
