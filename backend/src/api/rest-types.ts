import {DateRange} from './rest-models/date-range';
import {EMAIL_GROUP, LoginInfo, PROVIDER_GROUP} from './rest-models/login-info';
import {Notification, ALL_GROUP, CREATE_GROUP} from './rest-models/notification';
import {PaymentsSessions} from './rest-models/payments-sessions';
import {ProfileRequest, ProfileIndexRequest} from './rest-models/profile-request';
import {UserRequest} from './rest-models/user';

import {SessionJoin} from './rest-models/session-join';
import {SessionsSelection} from './rest-models/session-selection';
import {Session, ALL_SESSION_GROUP, CREATE_SESSION_GROUP, EDIT_SESSION_GROUP} from './rest-models/session';
import {SessionStatus} from './rest-models/sessionStatus';
import {Token} from './rest-models/token';
import Profile from '../models/profiles'
import { PaymentsPoints } from './rest-models/payments-points';

export namespace VERIFICATION {
    export namespace LOGIN {
        export type INPUT = LoginInfo;
        export type OUTPUT = Token;
    }

    export namespace VERIFICATION.REGISTER {
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
    export namespace GET {
        export type INPUT = DateRange;
        export type OUTPUT = Session[];
    }

    export namespace CREATE {
        export const GROUPS = {
            INPUT: {CREATE_SESSION_GROUP}
        };

        export type INPUT = Session;
    }

    export namespace EDIT {
        export const GROUPS = {
            INPUT: {EDIT_SESSION_GROUP}
        };

        export type INPUT = Session;
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
