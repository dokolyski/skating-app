import {DateRange} from './rest-models/date-range';
import {EMAIL_GROUP, LoginInfo, PROVIDER_GROUP} from './rest-models/login-info';
import {Notification, ALL_GROUP, CREATE_GROUP} from './rest-models/notification';
import {PaymentsSessions} from './rest-models/payments-sessions';
import {Profile, ALL_PROFILES_GROUP, CREATE_PROFILE_GROUP, EDIT_PROFILE_GROUP} from './rest-models/profile';
import {SessionJoin} from './rest-models/session-join';
import {SessionsSelection} from './rest-models/session-selection';
import {Session, ALL_SESSION_GROUP, CREATE_SESSION_GROUP, EDIT_SESSION_GROUP} from './rest-models/session';
import {SessionStatus} from './rest-models/sessionStatus';
import {Token} from './rest-models/token';
import {REGISTER_GROUP, PART_GROUP, FULL_GROUP, EDIT_GROUP, User} from './rest-models/user';

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
    export namespace EDIT {
        export const GROUPS = {
            INPUT: {EDIT_GROUP}
        };

        export type INPUT = User;
    }
}

export namespace PROFILES.CREATE {
    export const GROUPS = {
        INPUT: {CREATE_PROFILE_GROUP}
    };

    export type INPUT = Profile;
}

export namespace PROFILES.EDIT {
    export const GROUPS = {
        INPUT: {EDIT_PROFILE_GROUP}
    };

    export type INPUT = Profile;
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
