import {UserRequest} from "./requests/user.dto";

export namespace USERS {
    export namespace CREATE {
        export type REQUEST = UserRequest;
        export type RESPONSE = void;
    }
}

