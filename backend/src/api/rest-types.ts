import {DateRange} from './rest-models/date-range';
import {EMAIL_GROUP, LoginInfo, PROVIDER_GROUP} from './rest-models/login-info';
import {Notification, ALL_GROUP, CREATE_GROUP} from './rest-models/notification';
import {PaymentsSessions} from './rest-models/payments-sessions';
import {ProfileRequest, ProfileIndexRequest} from './rest-models/profile-request';
import {UserRequest} from './rest-models/user';
import {SessionRequest, SessionIndexRequest} from './rest-models/session-request';

import {SessionJoin} from './rest-models/session-join';
import {SessionsSelection} from './rest-models/session-selection';
import {SessionStatus} from './rest-models/sessionStatus';
import {Token} from './rest-models/token';
import Profile from '../models/profiles'
import Session from '../models/sessions'
import { PaymentsPoints } from './rest-models/payments-points';

export namespace VERIFICATION {
    export namespace LOGIN {
        export type INPUT = LoginInfo;
        export type OUTPUT = Token;
    }

    export namespace REGISTER {
        export type INPUT = UserRequest;
    }
}

export namespace USERS {
    export namespace GET {
        export type OUTPUT = UserRequest;
    }

    export namespace EDIT {
        export type INPUT = UserRequest;
    }
}


export namespace PROFILES {
    export namespace INDEX {
        export type INPUT = ProfileIndexRequest;
        export type OUTPUT = Profile[];
    }

    export namespace GET {
        export type OUTPUT = Profile;
    }

    export namespace CREATE {
        export type INPUT = ProfileRequest;
    }

    export namespace EDIT {
        export type INPUT = ProfileRequest;
    }
}

export namespace SESSIONS {
    export namespace INDEX {
        export type INPUT = SessionIndexRequest;
        export type OUTPUT = Session[];
    }

    export namespace GET {
        export type OUTPUT = Session;
    }

    export namespace CREATE {
        export type INPUT = SessionRequest;
    }

    export namespace EDIT {
        export type INPUT = SessionRequest;
    }

    export namespace EDIT_STATUS {
        export type INPUT = SessionStatus;
    }
}


export namespace SESSION_PARTICIPANTS {
    export namespace JOIN {
        export type INPUT = SessionJoin;
    }
}

export namespace NOTIFICATIONS.GET_NOTIFICATIONS {
    export const GROUPS = {
        OUTPUT: {ALL_GROUP}
    };

    export namespace RUNTIME {
        export const INPUT = SessionsSelection;
    }

    export namespace COMPILATION {
        export type INPUT = SessionsSelection;
        export type OUTPUT = Notification[];
    }
}


export namespace NOTIFICATIONS.EDIT_STATUS {
    export namespace RUNTIME {
        export const INPUT = SessionStatus;
    }

    export namespace COMPILATION {
        export type INPUT = SessionStatus;
    }
}

export namespace PAYMENTS {
    export namespace BUY_POINTS {
        export type INPUT = PaymentsPoints;
    }
}

export namespace CONFIG.GET {
    export type OUTPUT = any;
}
