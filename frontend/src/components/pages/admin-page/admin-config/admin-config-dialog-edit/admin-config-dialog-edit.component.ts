import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MoneyComponent } from 'components/common/inputs/money/money.component';
import { PointsComponent } from 'components/common/inputs/points/points.component';
import { Subscription } from 'rxjs';

/**
 * @description Show ```Edit``` or ```Add``` dialog, allow to change privileges.
 */
@Component({
  selector: 'app-admin-config-dialog-edit',
  templateUrl: './admin-config-dialog-edit.component.html',
  styleUrls: ['./admin-config-dialog-edit.component.css']
})
export class AdminConfigDialogEditComponent implements OnInit, OnDestroy {
  title: string;
  form = this.fb.group({
    points: PointsComponent.controlSchema,
    required_money: MoneyComponent.controlSchema
  });
  s: Subscription;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private dialogRef: MatDialogRef<AdminConfigDialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {required_money: string, points: string}) {}

  ngOnInit() {
    if(this.data.points) {
      this.form.get('points').setValue(this.data.points);
    }

    if(this.data.required_money) {
      this.form.get('required_money').setValue(this.data.required_money);
    }

    const mode = this.data.points || this.data.required_money ? 'EDIT' : 'ADD';
    this.s = this.translate.get(`pages.admin.config.dialog.title.${mode}`).subscribe(t => this.title = t);
  }

  ngOnDestroy() {
    this.s.unsubscribe();
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
