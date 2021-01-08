import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { USERS } from 'api/rest-types';
import { Col } from 'components/common/interactive-table/interactive-table.component';
import { RestService } from 'services/rest-service/Rest.service';
import * as REST_PATH from 'api/rest-url.json';
import { UserRequest } from 'api/rest-models/user-request';
import { AuthService } from 'services/auth-service/Auth.service';
import { UserChmod } from 'api/rest-models/user-chmod';
import { tap } from 'rxjs/operators';
import { zip } from 'rxjs';

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
  private dialogRef: MatDialogRef<AdminUsersComponent>;
  private originalData: DataType;
  private deletedUserId: Set<number> = new Set();
  private editedUserId: Set<number> = new Set();
  cols: Col[];
  rows: DataType;

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private rest: RestService) {}

  ngOnInit() {
    this.rest.do<USERS.ALL.OUTPUT>(REST_PATH.USERS.ALL)
      .subscribe({
        next: (data: UserRequest[]) => {
          this.rows = this.originalData = data.map(
            v => ({
              id: v.id.toString(),
              firstname: v.firstname,
              lastname: v.lastname,
              isOrganizer: v.isOrganizer.toString(),
              isAdmin: v.isAdmin.toString(),
              isHAdmin: v.isHAdmin.toString()
            })
          );

          this.initCols();
        },
        // TODO: error: (error: RestError) => this.handleErrors(error)
      });

  }

  onEdit(rownum: number) {
    if(!this.dialogRef) {
      this.auth.sessionInfo$.subscribe(({ isHAdmin }) => {
        const {isOrganizer, isAdmin} = this.rows[rownum];
        const data = isHAdmin ? {isOrganizer, isAdmin} : {isOrganizer};
        this.dialogRef = this.dialog.open(AdminUsersComponent, {data});

        this.dialogRef.afterClosed().subscribe(({save, data: dialData}) => {
          if(save) {
            this.rows[rownum].isOrganizer = dialData.isOrganizer;
            this.rows[rownum].isAdmin = dialData.isAdmin ?? this.rows[rownum].isAdmin;
            this.editedUserId.add(rownum);
          }
        });
      });
    }
  }

  onDelete(rownum: number) {
    if (this.rows[rownum].isAdmin) {
      this.auth.sessionInfo$.subscribe(({ isHAdmin }) => {
        if (isHAdmin) {
          this.removeRow(rownum);
        }
      });
    } else {
      this.removeRow(rownum);
    }
  }

  saveData() {
    const $ = Object.entries(this.originalData).map(([index, oData]) => {
      const rowid = Number.parseInt(index, 10);

      if (this.deletedUserId.has(rowid)) {
        return this.rest.do(REST_PATH.USERS.DELETE, { templateParamsValues: { id: oData.id } })
          .pipe(
            tap(() => this.deletedUserId.delete(rowid))
          );
      } else if (this.editedUserId.has(rowid)) {
        const [admin, organizer] = [oData.isAdmin as unknown as boolean, oData.isOrganizer as unknown as boolean];
        const body: UserChmod = { admin, organizer };
        return this.rest.do(REST_PATH.USERS.CHMOD, { templateParamsValues: { id: oData.id }, body })
          .pipe(
            tap(() => this.editedUserId.delete(rowid))
          );
      }
    });

    zip($).subscribe({
      next: () => this.rows = this.originalData
    });
  }

  cancelData() {
    this.rows = this.originalData;
    this.deletedUserId.clear();
    this.editedUserId.clear();
  }

  private removeRow(rownum: number) {
    const id = Number.parseInt(this.rows[rownum].id, 10);
    this.deletedUserId.add(id);
    this.rows.splice(rownum);
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
