import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-users-dialog',
  templateUrl: './admin-users-dialog.component.html'
})
export class AdminUsersDialogComponent {
  organizerSelected: boolean = this.data.isOrganizer;
  adminSelected: boolean = this.data.isAdmin;

  constructor(
    private dialogRef: MatDialogRef<AdminUsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {isOrganizer: boolean, isAdmin?: boolean}) {}

  onCancel() {
    this.dialogRef.close({save: false, data: null});
  }

  onSave() {
    const data = {
      isOrganizer: this.organizerSelected,
      isAdmin: this.adminSelected
    };
    this.dialogRef.close({save: true, data });
  }
}
