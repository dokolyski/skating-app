import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionInfoPaneComponent } from './session-info-pane.component';

describe('SessionInfoPaneComponent', () => {
  let component: SessionInfoPaneComponent;
  let fixture: ComponentFixture<SessionInfoPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionInfoPaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionInfoPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
