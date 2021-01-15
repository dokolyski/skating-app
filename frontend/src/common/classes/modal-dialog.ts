import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filter, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

/**
 * @summary Dialog handler
 * @description Handle MatDialog opening status, unsubscribe when dialog has been closed
 */
export class ModalDialog<T = any> {
    private dialogRef: MatDialogRef<any>;

    constructor(
        private dialogComponent: any,
        private matDialog: MatDialog) { }

    open(data): Observable<T> {
        if (!this.dialogRef) {
            this.dialogRef = this.matDialog.open(this.dialogComponent, { data });
            return this.dialogRef.afterClosed()
                .pipe(
                    tap(() => this.dialogRef = null),
                    filter(v => v)
                );
        }

        return of();
    }
}
