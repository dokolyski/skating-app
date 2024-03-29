import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Col} from 'components/common/interactive-table/interactive-table.component';
import {RestService} from 'services/rest-service/rest.service';
import {restUrls} from 'api/rest-urls';
import {AuthService} from 'services/auth-service/auth.service';
import {UserChmod} from 'api/requests/user-chmod';
import {first, map, mergeMap, tap} from 'rxjs/operators';
import {from, Subscription, zip} from 'rxjs';
import {ArraySubject} from 'common/classes/array-subject';
import {AdminUsersDialogEditComponent} from './admin-users-dialog-edit/admin-users-dialog-edit.component';
import {ModalDialog} from 'common/classes/modal-dialog';
import {UserResponseWithName} from 'api/responses/user.dto';
import {TranslateService} from '@ngx-translate/core';
import {ErrorInterceptorService} from 'services/error-interceptor-service/error-interceptor.service';
import {ErrorMessageService} from 'services/error-message-service/error.message.service';
import {HttpErrorResponse} from '@angular/common/http';

type DataType = {
  id: string,
  firstname: string,
  lastname: string,
  isOrganizer: string,
  isAdmin: string
}[];

type DialDataType = {
  isOrganizer: boolean,
  isAdmin: boolean
};

/**
 * @description Show table with users and allow to ```delete user``` or ```change permissions```.
 */
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  private s: Subscription;
  private dialog = new ModalDialog(AdminUsersDialogEditComponent, this.matDialog);
  private originalData: DataType;
  private deletedUserId: Set<number> = new Set();
  private editedUserId: Set<number> = new Set();

  cols: Col[];
  rows = new ArraySubject<any>();

  constructor(
    private translate: TranslateService,
    private matDialog: MatDialog,
    private auth: AuthService,
    private interceptor: ErrorInterceptorService,
    private errorMessageService: ErrorMessageService,
    private rest: RestService) {
  }

  ngOnInit() {
    this.rest.do<UserResponseWithName[]>(restUrls.USERS.ALL)
      .subscribe({
        next: data => {
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
        error: (error: HttpErrorResponse) => this.errorMessageService.handleMessageError(error)
      });
  }

  ngOnDestroy() {
    this.s?.unsubscribe();
  }

  onEdit(rownum: number) {
    this.auth.sessionInfo$
      .pipe(
        first(),
        map(({isHAdmin: selfIsHAdmin}) => {
          const row = this.rows.getIndexCopy(rownum);
          const [isOrganizer, isAdmin, isHAdmin] = [
            this.castBoolean(row.isOrganizer),
            this.castBoolean(row.isAdmin),
            this.castBoolean(row.isHAdmin)
          ];
          return selfIsHAdmin && !isHAdmin ? {isOrganizer, isAdmin} : {isOrganizer};
        }),
        mergeMap(data => this.dialog.open(data))
      ).subscribe(dialData => {
      if (dialData) {
        const changeRow = this.rows.getIndexCopy(rownum);
        changeRow.isOrganizer = this.castString(dialData.isOrganizer);
        if (dialData.isAdmin) {
          changeRow.isAdmin = this.castString(dialData.isAdmin);
        }
        this.rows.setIndex(changeRow, rownum);
        this.editedUserId.add(rownum);
      }
    });
  }

  onDelete(rownum: number) {
    const {isAdmin: rA, isHAdmin: rHA} = this.rows.getIndexCopy(rownum);

    if (rA === 'true') {
      this.auth.sessionInfo$
        .pipe(
          first()
        ).subscribe(({isHAdmin}) => {
        if (isHAdmin && rHA === 'false') {
          this.removeRow(rownum);
        } else {
          this.translate.get('errors.messages.ACCESS_FORBIDDEN')
            .pipe(
              first()
            ).subscribe(e => this.interceptor.error.emit(e));
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

            return this.rest.do(restUrls.USERS.DELETE, {templateParamsValues: {id: oData.id}})
              .pipe(
                tap(() => this.deletedUserId.delete(rowid)),
              );
          } else if (this.editedUserId.has(rowid)) {

            const [admin, organizer] = [oData.isAdmin as any, oData.isOrganizer as any];
            const body: UserChmod = {admin, organizer};
            return this.rest.do(restUrls.USERS.CHMOD, {templateParamsValues: {id: oData.id}, body})
              .pipe(
                tap(() => this.editedUserId.delete(rowid))
              );
          }
        })
      ).subscribe({
      next: () => this.rows.setDataCopy(this.originalData),
      error: (error: HttpErrorResponse) => this.errorMessageService.handleMessageError(error)
    });
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
    this.s = zip(
      this.translate.get('pages.admin.users.columns.ID'),
      this.translate.get('pages.admin.users.columns.FIRSTNAME'),
      this.translate.get('pages.admin.users.columns.LASTNAME'),
      this.translate.get('pages.admin.users.columns.IS_ORGANIZER'),
      this.translate.get('pages.admin.users.columns.IS_ADMIN'),
      this.translate.get('pages.admin.users.columns.IS_HADMIN')
    ).subscribe(t => {
      this.cols = [
        {
          name: 'id',
          label: t[0]
        },
        {
          name: 'firstname',
          label: t[1]
        },
        {
          name: 'lastname',
          label: t[2]
        },
        {
          name: 'isOrganizer',
          label: t[3]
        },
        {
          name: 'isAdmin',
          label: t[4]
        },
        {
          name: 'isHAdmin',
          label: t[5]
        },
      ];
    });
  }
}
