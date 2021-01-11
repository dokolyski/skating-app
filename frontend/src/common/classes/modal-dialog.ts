import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

export class ModalDialog {
    private dialogRef: MatDialogRef<any>;

    constructor(
        private dialogType: any,
        private matDialog: MatDialog) { }

    open(data) {
        if (!this.dialogRef) {
            this.dialogRef = this.matDialog.open(this.dialogType, { data });
            return this.dialogRef.afterClosed()
                .pipe(
                    tap(() => this.dialogRef = null),
                    filter(v => v),
                );
        }

        return of();
    }
}
