import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatListOption} from '@angular/material/list';
import {SelectionModel} from '@angular/cdk/collections';
import * as moment from 'moment';
import {ProfileResponse} from 'api/responses/profile.dto';

@Component({
  selector: 'app-choose-participant-dialog',
  templateUrl: './choose-participant-dialog.component.html',
  styleUrls: ['./choose-participant-dialog.component.css']
})
export class ChooseParticipantDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
  }

  chosenParticipantsString(selectedOptions: SelectionModel<MatListOption>): string {
    return this.getValues(selectedOptions).map(value => `${value.firstname} ${value.lastname}`).join(', ');
  }

  getValues(selectedOptions): any[] {
    return selectedOptions.selected.map(value => value.value);
  }

  formatDateString() {
    return moment(this.data.session.start_date).format('LLLL');
  }

  isAlreadyAdded(profile: ProfileResponse) {
    return this.data.alreadyAddedParticipants.some(value => value.id === profile.id)
      || this.data.session.profiles.some(value => value.id === profile.id);
  }
}
