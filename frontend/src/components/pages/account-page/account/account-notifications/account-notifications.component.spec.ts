/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNotificationsComponent } from './account-notifications.component';
import { moduleInfo } from './account-notifications.module';

xdescribe('ProfileAddComponent', () => {
  let component: AccountNotificationsComponent;
  let fixture: ComponentFixture<AccountNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule(moduleInfo).compileComponents();

    fixture = TestBed.createComponent(AccountNotificationsComponent);
    component = fixture.componentInstance;
  });

  it('fetch sessions and notifications', () => {

  });

  it('merged notifications with related sessions', () => {

  });

  it('emits generalised server error', () => {

  });

  it('show notification title, description and session name on same panel', () => {

  });
});
