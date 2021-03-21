import {UserEditRequest, UserRequest} from './requests/user.dto';
import {SessionEditRequest, SessionRequest, SessionStatusRequest} from './requests/session.dto';
import {ProfileEditRequest, ProfileRequest} from './requests/profile.dto';
import {ProfileResponse} from './responses/profile.dto';
import {
    NotificationStatusRequest,
    NotificationRequest
} from './requests/notification.dto';
import {NotificationResponse} from "./responses/notification.dto";
import {LoginResponse} from "./responses/login.dto";
import {LoginRequest} from "./requests/login.dto";
import {DisjoinRequest, JoinRequest} from "./requests/session-participant.dto";
import SessionResponse from "./responses/session.dto";
import {PaymentResponse} from "./responses/payment.dto";
import {UserResponse, UserResponseWithName} from './responses/user.dto';


export namespace VERIFICATION {

    export namespace LOGIN {
        export type REQUEST = LoginRequest;
        export type RESPONSE = LoginResponse;
    }

    export namespace REGISTER {
        export type REQUEST = UserRequest;
        export type RESPONSE = void;
    }
}


export namespace USERS {

    export namespace INDEX {
        export type REQUEST = void;
        export type RESPONSE = UserResponseWithName[];
    }

    export namespace GET {
        export type REQUEST = UserRequest;
        export type RESPONSE = UserResponse;
    }

    export namespace CREATE {
        export type REQUEST = UserRequest;
        export type RESPONSE = void;
    }

    export namespace UPDATE {
        export type REQUEST = UserEditRequest;
        export type RESPONSE = void;
    }

    export namespace DELETE {
        export type REQUEST = void;
        export type RESPONSE = void;
    }
}


export namespace PROFILES {

    export namespace INDEX {
        export type REQUEST = void;
        export type RESPONSE = ProfileResponse[];
    }

    export namespace GET {
        export type REQUEST = ProfileRequest;
        export type RESPONSE = ProfileResponse;
    }

    export namespace CREATE {
        export type REQUEST = ProfileRequest;
        export type RESPONSE = void;
    }

    export namespace UPDATE {
        export type REQUEST = ProfileEditRequest;
        export type RESPONSE = void;
    }

    export namespace DELETE {
        export type REQUEST = void;
        export type RESPONSE = void;
    }
}


export namespace SESSIONS {

    export namespace INDEX {
        export type REQUEST = void;
        export type RESPONSE = SessionResponse[];
    }

    export namespace CREATE {
        export type REQUEST = SessionRequest;
        export type RESPONSE = void;
    }

    export namespace UPDATE {
        export type REQUEST = SessionEditRequest;
        export type RESPONSE = void;
    }

    export namespace STATUS {
        export type REQUEST = SessionStatusRequest;
        export type RESPONSE = void;
    }

    export namespace DELETE {
        export type REQUEST = void;
        export type RESPONSE = void;
    }
}


export namespace NOTIFICATIONS {

    export namespace INDEX {
        export type REQUEST = void;
        export type RESPONSE = NotificationResponse[];
    }

    export namespace GET {
        export type REQUEST = NotificationRequest;
        export type RESPONSE = NotificationResponse;
    }

    export namespace CREATE {
        export type REQUEST = NotificationRequest;
        export type RESPONSE = void;
    }

    export namespace STATUS {
        export type REQUEST = NotificationStatusRequest;
        export type RESPONSE = void;
    }

    export namespace DELETE {
        export type REQUEST = void;
        export type RESPONSE = void;
    }
}


export namespace PARTICIPANTS {

    export namespace JOIN {
        export type REQUEST = JoinRequest;
        export type RESPONSE = void;
    }

    export namespace DISJOIN {
        export type REQUEST = DisjoinRequest;
        export type RESPONSE = void;
    }
}


export namespace PAYMENTS {
    export namespace CREATE {
        export type REQUEST = JoinRequest;
        export type RESPONSE = PaymentResponse;
    }

    export namespace VERYFI {
        export type REQUEST = any;
        export type RESPONSE = void;
    }
}


