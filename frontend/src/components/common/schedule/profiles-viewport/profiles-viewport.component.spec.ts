import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesViewportComponent } from './profiles-viewport.component';

describe('ProfilesViewportComponent', () => {
  let component: ProfilesViewportComponent;
  let fixture: ComponentFixture<ProfilesViewportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilesViewportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesViewportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
