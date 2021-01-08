import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoneyComponent } from 'components/common/inputs/money/money.component';
import { PointsComponent } from 'components/common/inputs/points/points.component';

@Component({
  selector: 'app-admin-config-dialog',
  templateUrl: './admin-config-dialog.component.html',
  styleUrls: ['./admin-config-dialog.component.css']
})
export class AdminConfigDialogComponent implements OnInit {
  title: string;
  form = this.fb.group({
    points: PointsComponent.controlSchema,
    money: MoneyComponent.controlSchema
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdminConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {money: string, points: string}) {}

  ngOnInit() {
    if(this.data.points) {
      this.form.get('points').setValue(this.data.points);
    }

    if(this.data.money) {
      this.form.get('money').setValue(this.data.money);
    }

    this.title = this.data.points || this.data.money ? 'Edit' : 'Add';
  }

  onCancel() {
    this.dialogRef.close({save: false, data: null});
  }

  onSave() {
    if(this.form.valid) {
      const data = {
        points: this.form.get('points').value,
        money: this.form.get('money').value
      };
      this.dialogRef.close({save: true, data });
    }
  }
}
