import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileResponse} from 'api/responses/profile.dto';

@Component({
  selector: 'app-profile-selection[values]',
  templateUrl: './profile-selection.component.html'
})
export class ProfileSelectionComponent implements OnInit {

  @Input()
  values: ProfileResponse[];

  @Input()
  selected: ProfileResponse;

  /**
   * @description Selected another ```profile```
   */
  @Output()
  selectedChange = new EventEmitter<ProfileResponse>();

  set _selectedProfile(val: ProfileResponse) {
    this.selectedChange.emit(val);
  }

  get _selectedProfile() {
    return this.selected;
  }

  ngOnInit() {
    if (!this.selected && this.values.length) {
      this.selected = this.values[0];
    }
  }

  objectComparisonFunction(option: ProfileResponse, value: ProfileResponse): boolean {
    return option.firstname === value.firstname && option.lastname === value.lastname;
  }
}
