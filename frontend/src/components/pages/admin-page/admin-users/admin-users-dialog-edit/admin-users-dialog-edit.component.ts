import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-users-dialog-edit',
  templateUrl: './admin-users-dialog-edit.component.html',
  styleUrls: ['./admin-user-dialog-edit.style.css']
})
export class AdminUsersDialogEditComponent {
  form = this.fb.group({
    organizerSelected: [this.data.isOrganizer],
    adminSelected: [this.data.isAdmin]
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdminUsersDialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {isOrganizer: boolean, isAdmin?: boolean}) {}

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    const data = {
      isOrganizer: this.form.get('organizerSelected').value,
      isAdmin: this.form.get('adminSelected').value
    };
    this.dialogRef.close(data);
  }
}
