import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { USERS } from 'api/rest-types';
import { Col } from 'components/common/interactive-table/interactive-table.component';
import { RestService } from 'services/rest-service/Rest.service';
import * as REST_PATH from 'api/rest-url.json';
import { UserRequest } from 'api/rest-models/user-request';
import { AuthService } from 'services/auth-service/Auth.service';
import { UserChmod } from 'api/rest-models/user-chmod';
import { first, map, mergeMap, tap } from 'rxjs/operators';
import { from, zip } from 'rxjs';
import { ArraySubject } from 'common/classes/array-subject';
import { AdminUsersDialogEditComponent } from './admin-users-dialog-edit/admin-users-dialog-edit.component';
import { ModalDialog } from 'common/classes/modal-dialog';

type DataType = {
  id: string,
  firstname: string,
  lastname: string,
  isOrganizer: string,
  isAdmin: string
}[];

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  private dialog = new ModalDialog(AdminUsersDialogEditComponent, this.matDialog);
  private originalData: DataType;
  private deletedUserId: Set<number> = new Set();
  private editedUserId: Set<number> = new Set();

  cols: Col[];
  rows = new ArraySubject<any>();

  constructor(
    private matDialog: MatDialog,
    private auth: AuthService,
    private rest: RestService) { }

  ngOnInit() {
    this.rest.do<USERS.ALL.OUTPUT>(REST_PATH.USERS.ALL)
      .subscribe({
        next: (data: UserRequest[]) => {
          this.originalData = data.map(
            v => ({
              id: v.id.toString(),
              firstname: v.firstname,
              lastname: v.lastname,
              isOrganizer: v.isOrganizer.toString(),
              isAdmin: v.isAdmin.toString(),
              isHAdmin: v.isHAdmin.toString()
            })
          );

          this.rows.setDataCopy(this.originalData);
          this.initCols();
        },
        // TODO: error: (error: RestError) => this.handleErrors(error)
      });

  }

  onEdit(rownum: number) {
    this.auth.sessionInfo$
      .pipe(
        first(),
        map(({ isHAdmin: selfIsHAdmin }) => {
          const row = this.rows.getIndexCopy(rownum);
          const [isOrganizer, isAdmin, isHAdmin] = [
            this.castBoolean(row.isOrganizer),
            this.castBoolean(row.isAdmin),
            this.castBoolean(row.isHAdmin)
          ];
          return selfIsHAdmin && !isHAdmin ? { isOrganizer, isAdmin } : { isOrganizer };
        }),
        mergeMap(data => this.dialog.open(data))
      ).subscribe(dialData => {
        if (dialData) {
          const changeRow = this.rows.getIndexCopy(rownum);
          changeRow.isOrganizer =this.castString(dialData.isOrganizer);
          if(dialData.isAdmin) {
            changeRow.isAdmin = this.castString(dialData.isAdmin);
          }
          this.rows.setIndex(changeRow, rownum);
          this.editedUserId.add(rownum);
        }
      });
  }

  onDelete(rownum: number) {
    if (this.rows.getIndexCopy(rownum).isAdmin === 'true') {
      this.auth.sessionInfo$
        .pipe(
          first()
        ).subscribe(({ isHAdmin }) => {
          if (isHAdmin) {
            this.removeRow(rownum);
          } else {
            alert('Brak uprawnień');
          }
        });
    } else {
      this.removeRow(rownum);
    }
  }

  saveData() {
    from(Object.entries(this.originalData))
      .pipe(
        mergeMap(([index, oData]) => {
          const rowid = Number.parseInt(index, 10);
          if (this.deletedUserId.has(rowid)) {
            return this.rest.do(REST_PATH.USERS.DELETE, { templateParamsValues: { id: oData.id } })
              .pipe(
                tap(() => this.deletedUserId.delete(rowid))
              );
          } else if (this.editedUserId.has(rowid)) {
            const [admin, organizer] = [oData.isAdmin as any, oData.isOrganizer as any];
            const body: UserChmod = { admin, organizer };
            return this.rest.do(REST_PATH.USERS.CHMOD, { templateParamsValues: { id: oData.id }, body })
              .pipe(
                tap(() => this.editedUserId.delete(rowid))
              );
          }
        })
      ).subscribe(() => this.rows.setDataCopy(this.originalData));
  }

  cancelData() {
    this.rows.setDataCopy(this.originalData);
    this.deletedUserId.clear();
    this.editedUserId.clear();
  }

  private castBoolean(v: string): boolean {
    return v === 'true' ? true : v === 'false' ? false : null;
  }

  private castString(v: boolean): string {
    return v === true ? 'true' : v === false ? 'false' : null;
  }

  private removeRow(rownum: number) {
    const id = Number.parseInt(this.rows.getIndexCopy(rownum).id, 10);
    this.deletedUserId.add(id);
    this.rows.deleteIndex(rownum);
  }

  private initCols() {
    this.cols = [
      {
        label: 'id',
        name: 'id'
      },
      {
        label: 'firstname',
        name: 'firstname'
      },
      {
        label: 'lastname',
        name: 'lastname'
      },
      {
        label: 'isOrganizer',
        name: 'isOrganizer'
      },
      {
        label: 'isAdmin',
        name: 'isAdmin'
      },
      {
        label: 'isHAdmin',
        name: 'isHAdmin'
      },
    ];
  }
}
