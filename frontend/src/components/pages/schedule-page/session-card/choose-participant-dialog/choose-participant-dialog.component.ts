import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatListOption} from '@angular/material/list';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-choose-participant-dialog',
  templateUrl: './choose-participant-dialog.component.html',
  styleUrls: ['./choose-participant-dialog.component.css']
})
export class ChooseParticipantDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  chosenParticipantsString(selectedOptions: SelectionModel<MatListOption>): string {
    return this.getValues(selectedOptions).map(value => `${value.firstname} ${value.lastname}`).join(', ');
  }

  getValues(selectedOptions): any[] {
    return selectedOptions.selected.map(value => value.value);
  }
}
