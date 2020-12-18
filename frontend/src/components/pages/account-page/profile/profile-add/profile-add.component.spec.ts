/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAddComponent } from './profile-add.component';
import { moduleInfo } from './profile-add.module';

xdescribe('ProfileAddComponent', () => {
  let component: ProfileAddComponent;
  let fixture: ComponentFixture<ProfileAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule(moduleInfo).compileComponents();

    fixture = TestBed.createComponent(ProfileAddComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
