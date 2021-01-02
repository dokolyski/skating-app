import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseParticipantDialogComponent } from './choose-participant-dialog.component';

describe('ChooseParticipantDialogComponent', () => {
  let component: ChooseParticipantDialogComponent;
  let fixture: ComponentFixture<ChooseParticipantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseParticipantDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseParticipantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
