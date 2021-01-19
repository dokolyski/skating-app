import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatListOption} from '@angular/material/list';
import {SelectionModel} from '@angular/cdk/collections';
import {ProfileResponse} from 'api/responses/profile.dto';
import {FormatterService} from 'services/formatter-service/formatter.service';

@Component({
  selector: 'app-choose-participant-dialog',
  templateUrl: './choose-participant-dialog.component.html',
  styleUrls: ['./choose-participant-dialog.component.css']
})
export class ChooseParticipantDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public formatterService: FormatterService) { }

  chosenParticipantsString(selectedOptions: SelectionModel<MatListOption>): string {
    return this.getValues(selectedOptions).map(value => `${value.firstname} ${value.lastname}`).join(', ');
  }

  getValues(selectedOptions): any[] {
    return selectedOptions.selected.map(value => value.value);
  }

  isAlreadyAdded(profile: ProfileResponse) {
    return this.data.alreadyAddedParticipants.some(value => value.id === profile.id)
      || this.data.session.profiles.some(value => value.id === profile.id);
  }
}
