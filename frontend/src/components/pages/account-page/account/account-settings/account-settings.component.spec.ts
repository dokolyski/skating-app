/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsComponent } from './account-settings.component';
import { moduleInfo } from './account-settings.module'

xdescribe('ProfileAddComponent', () => {
  let component: AccountSettingsComponent;
  let fixture: ComponentFixture<AccountSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule(moduleInfo).compileComponents();

    fixture = TestBed.createComponent(AccountSettingsComponent);
    component = fixture.componentInstance;
  });

  it('fetch skills', () => {

  })

  it('fetch user info', () => {

  })  

  it('fetch profiles', () => {

  })

  it('sets user info into form fields', () => {

  })

  it('rollback user info on edit state change', () => {

  })

  it('send settings on edit change', () => {

  })
  
  it('show fields errors', () => {

  })

  it('show server-side errors', () => {

  })

  it('emits error on server error with generalised message', () => {

  })
});
