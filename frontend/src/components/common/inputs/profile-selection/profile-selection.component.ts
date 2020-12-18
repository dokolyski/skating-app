import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PROFILES } from 'api/rest-types-client';

type Profile = PROFILES.GET_PROFILES.OUTPUT[0]

@Component({
  selector: 'app-profile-selection[translation][values]',
  templateUrl: './profile-selection.component.html'
})
export class ProfileSelectionComponent implements OnInit {
  @Input()
  translation: { errors, form }
  @Input()
  values: Profile[]
  
  @Input()
  selected: Profile

  /** 
   * @description Selected another ```profile```
  */
  @Output()
  selectedChange = new EventEmitter<Profile>()

  set _selectedProfile(val: Profile) {
    this.selectedChange.emit(val)
  }
  get _selectedProfile() {
    return this.selected
  }

  ngOnInit() {
    if(!this.selected && this.values.length) {
      this.selected = this.values[0]
    }
  }

  objectComparisonFunction(option: Profile, value: Profile ) : boolean {
    return option.firstname == value.firstname && option.lastname == value.lastname
  }
}
