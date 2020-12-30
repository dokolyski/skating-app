import {DateRange} from './rest-models/date-range';
import {EMAIL_GROUP, LoginInfo, PROVIDER_GROUP} from './rest-models/login-info';
import {Notification, ALL_GROUP, CREATE_GROUP} from './rest-models/notification';
import {PaymentsSessions} from './rest-models/payments-sessions';
import {ProfileRequest, ProfileIndexRequest} from './rest-models/profile-request';
import {SessionJoin} from './rest-models/session-join';
import {SessionsSelection} from './rest-models/session-selection';
import {Session, ALL_SESSION_GROUP, CREATE_SESSION_GROUP, EDIT_SESSION_GROUP} from './rest-models/session';
import {SessionStatus} from './rest-models/sessionStatus';
import {Token} from './rest-models/token';
import {REGISTER_GROUP, PART_GROUP, FULL_GROUP, EDIT_GROUP, User} from './rest-models/user';
import Profile from '../models/profiles'

export namespace VERIFICATION.LOGIN {
    export const GROUPS = {
        INPUT: {PROVIDER_GROUP, EMAIL_GROUP}
    };

    export type INPUT = LoginInfo;
    export type OUTPUT = Token;
}

export namespace VERIFICATION.REGISTER {
    export const GROUPS = {
        INPUT: {REGISTER_GROUP}
    };

    export type INPUT = User;
}


export namespace USERS {
    export namespace GET {
        export type OUTPUT = User;
    }

    export namespace EDIT {
        export const GROUPS = {
            INPUT: {EDIT_GROUP}
        };

        export type INPUT = User;
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

export namespace CONFIG.GET {
    export type OUTPUT = any;
}
