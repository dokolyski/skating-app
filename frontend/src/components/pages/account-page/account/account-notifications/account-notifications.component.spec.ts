import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LanguageErrorService } from 'services/languageError-service/LanguageError.service';
import { RestService } from 'services/rest-service/Rest.service';

import { AccountNotificationsComponent } from './account-notifications.component';
import { moduleInfo } from './account-notifications.module';
import * as REST_PATH from 'api/rest-url.json';
import { Session } from 'api/rest-models/session';
import { Notification } from 'api/rest-models/notification';
import { MatAccordionHarness } from '@angular/material/expansion/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LazyComponent, transformToLazy } from 'common/lazy-component-init';
import { of } from 'rxjs';

describe('account-notifications.component', () => {
  let rest: jasmine.SpyObj<RestService>;
  let lngError: jasmine.SpyObj<LanguageErrorService>;

  let lazy: LazyComponent<typeof AccountNotificationsComponent>;
  let loader: HarnessLoader;
  let component: AccountNotificationsComponent;
  let fixture: ComponentFixture<AccountNotificationsComponent>;

  let sessions: Session[];
  let notifications: Notification[];
  let ordered: { session_info, notification_info }[];

  beforeEach(() => {
    rest = jasmine.createSpyObj('RestService', ['do']);
    lngError = jasmine.createSpyObj('LngErrorService', ['getErrorsStrings']);

    const module: any = moduleInfo;
    module.imports.push(NoopAnimationsModule);
    module.providers = [
      { provide: RestService, useValue: rest },
      { provide: LanguageErrorService, useValue: lngError }
    ];
    TestBed.configureTestingModule(module).compileComponents();

    lazy = transformToLazy(AccountNotificationsComponent);
    fixture = TestBed.createComponent(lazy.getComponentClass());
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    lazy.context = component;
  });

  beforeEach(() => {
    sessions = [
      (() => {
        const s = new Session();
        s.id = 0;
        s.name = `Session ${s.id}`;
        return s;
      })(),
      (() => {
        const s = new Session();
        s.id = 1;
        s.name = `Session ${s.id}`;
        return s;
      })(),
      (() => {
        const s = new Session();
        s.id = 2;
        s.name = `Session ${s.id}`;
        return s;
      })()
    ];

    notifications = [
      (() => {
        const n = new Notification();
        n.session_id = 1;
        n.expiration_date = new Date('01/01/1990');
        n.title = `Notification ${n.session_id}`;
        n.description = 'Description';
        return n;
      })(),
      (() => {
        const n = new Notification();
        n.session_id = 1;
        n.expiration_date = new Date('01/01/1991');
        n.title = `Notification ${n.session_id}`;
        n.description = 'Description';
        return n;
      })()
    ];

    ordered = [
      { session_info: sessions[1], notification_info: notifications[1] },
      { session_info: sessions[1], notification_info: notifications[0] }
    ];
  });

  it('fetch sessions and notifications', () => {
    rest.do.withArgs(REST_PATH.NOTIFICATIONS.GET_NOTIFICATIONS).and.returnValue(of(notifications));
    rest.do.and.callFake(url => {
      expect(url).toEqual(REST_PATH.SESSIONS.GET_SESSIONS);
      return of(sessions) as any;
    });

    lazy.callInit();
  });

  it('emits generalised server error', () => {
    const [errorToken, errorValue] = ['ERROR_KEY', 'ErrorValue'];
    const serverError = { messageToken: errorToken };
    const translatedError = { message: errorValue };

    lngError.getErrorsStrings.withArgs(serverError).and.returnValue(of(translatedError));
    rest.do.withArgs(REST_PATH.NOTIFICATIONS.GET_NOTIFICATIONS).and.returnValue(of(notifications));
    rest.do.and.callFake(url => {
      expect(url).toEqual(REST_PATH.SESSIONS.GET_SESSIONS);
      return of(sessions) as any;
    });

    component.onError.subscribe(msg => expect(msg).toEqual(errorValue));
    lazy.callInit();
  });

  it('show notification title, description and session name on same panel', fakeAsync(async () => {
    rest.do.withArgs(REST_PATH.NOTIFICATIONS.GET_NOTIFICATIONS).and.returnValue(of(notifications));
    rest.do.and.callFake(url => {
      expect(url).toEqual(REST_PATH.SESSIONS.GET_SESSIONS);
      return of(sessions) as any;
    });

    lazy.callInit();

    tick(1000);
    fixture.detectChanges();
    await fixture.whenStable();

    const collection = await loader.getHarness(MatAccordionHarness);
    const panels = await collection.getExpansionPanels();

    panels.map(async (v, i) => {
      const n: Notification = ordered[i].notification_info;
      const s: Session = ordered[i].session_info;

      expect(n.title).toEqual(await v.getTitle());
      expect(n.description).toEqual(await v.getTextContent());
      expect(s.name).toEqual(await v.getDescription());
    });
  }));
});
