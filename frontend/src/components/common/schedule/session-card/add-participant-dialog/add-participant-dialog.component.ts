import {Component, Inject, OnInit} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-add-participant-dialog',
  templateUrl: './add-participant-dialog.component.html',
  styleUrls: ['./add-participant-dialog.component.css']
})
export class AddParticipantDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  changeSetting($event: MatCheckboxChange) {

  }

  formatSessionDate(): string {
    return moment(this.data.session.start_date).format('LLLL');
  }
}
