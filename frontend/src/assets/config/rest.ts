const REST = {
    VERIFICATION: {
        LOGIN: {
            URL: "api/tokens",
            METHOD: "POST"
        },
        LOGOUT: {
            URL: "api/tokens/{token}",
            PARAMS: ["token"],
            METHOD: "DELETE"
        },
        REGISTER: {
            URL: "api/users",
            METHOD: "POST"
        }
    },
    USER_INFO: {
        GET: {
            URL: "api/users/{id}",
            PARAMS: ["id"],
            METHOD: "GET"
        },
        EDIT: {
            URL: "api/users/{id}",
            PARAMS: ["id"],
            METHOD: "PUT"
        },
        DELETE: {
            URL: "api/users/{id}",
            PARAMS: ["id"],
            METHOD: "DELETE"
        }
    },
    PROFILES: {
        GET: {
            URL: "api/profiles",
            METHOD: "GET"
        },
        CREATE: {
            URL: "api/profiles",
            METHOD: "POST"
        },
        EDIT: {
            URL: "api/profiles/{id}",
            PARAMS: ["id"],
            METHOD: "PUT"
        },
        DELETE: {
            URL: "api/profiles/{id}",
            METHOD: "DELETE"
        }  
    },
    SESSIONS: {
        GET_SESSIONS: {
            URL: "api/sessions",
            METHOD: "GET"
        },
        CREATE: {
            URL: "api/sessions",
            METHOD: "POST"
        },
        EDIT: {
            URL: "api/sessions/{id}",
            PARAMS: ["id"],
            METHOD: "PUT"
        },
        EDIT_STATUS: {
            URL: "api/sessions/{id}/status",
            PARAMS: ["id"],
            METHOD: "PATCH"
        },
        DELETE: {
            URL: "api/sessions/{id}",
            PARAMS: ["id"],
            METHOD: "DELETE"
        },
        JOIN: {
            URL: "api/session_paricipant",
            METHOD: "POST"
        }
    },
    NOTIFICATIONS: {
        GET: {
            URL: "api/notifications",
            METHOD: "GET"
        },
        CREATE: {
            URL: "api/notifications",
            METHOD: "POST"
        },
        EDIT: {
            URL: "api/notifications/{id}/status",
            PARAMS: ["id"],
            METHOD: "PATCH"
        }
    }
}