import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoneyComponent } from 'components/common/inputs/money/money.component';
import { PointsComponent } from 'components/common/inputs/points/points.component';

@Component({
  selector: 'app-admin-config-dialog-edit',
  templateUrl: './admin-config-dialog-edit.component.html',
  styleUrls: ['./admin-config-dialog-edit.component.css']
})
export class AdminConfigDialogEditComponent implements OnInit {
  title: string;
  form = this.fb.group({
    points: PointsComponent.controlSchema,
    required_money: MoneyComponent.controlSchema
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdminConfigDialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {required_money: string, points: string}) {}

  ngOnInit() {
    if(this.data.points) {
      this.form.get('points').setValue(this.data.points);
    }

    if(this.data.required_money) {
      this.form.get('required_money').setValue(this.data.required_money);
    }

    this.title = this.data.points || this.data.required_money ? 'Edit' : 'Add';
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if(this.form.valid) {
      const data = {
        points: this.form.get('points').value,
        required_money: this.form.get('required_money').value
      };
      this.dialogRef.close(data);
    }
  }
}
