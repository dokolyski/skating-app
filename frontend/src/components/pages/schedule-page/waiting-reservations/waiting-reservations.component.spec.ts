import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingReservationsComponent } from './waiting-reservations.component';

describe('WaitingReservationsComponent', () => {
  let component: WaitingReservationsComponent;
  let fixture: ComponentFixture<WaitingReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
