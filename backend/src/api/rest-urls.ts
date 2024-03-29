export const restUrls = {
  VERIFICATION: {
    LOGIN: {
      URL: 'api/verification',
      METHOD: 'POST'
    },
    GOOGLE: {
      URL: 'api/verification/google',
      METHOD: 'GET'
    },
    LOGOUT: {
      URL: 'api/verification',
      PARAMS: ['token'],
      METHOD: 'DELETE'
    },
    REGISTER: {
      URL: 'api/users',
      METHOD: 'POST'
    }
  },
  USERS: {
    ALL: {
      URL: 'api/users',
      METHOD: 'GET'
    },
    GET: {
      URL: 'api/users/{id}',
      PARAMS: ['id'],
      METHOD: 'GET'
    },
    EDIT: {
      URL: 'api/users/{id}',
      PARAMS: ['id'],
      METHOD: 'PUT'
    },
    CHMOD: {
      URL: 'api/users/{id}/chmod',
      PARAMS: ['id'],
      METHOD: 'PATCH'
    },
    DELETE: {
      URL: 'api/users/{id}',
      PARAMS: ['id'],
      METHOD: 'DELETE'
    }
  },
  PROFILES: {
    INDEX: {
      URL: 'api/profiles',
      METHOD: 'GET'
    },
    GET: {
      URL: 'api/profiles/{id}',
      METHOD: 'GET'
    },
    CREATE: {
      URL: 'api/profiles',
      METHOD: 'POST'
    },
    EDIT: {
      URL: 'api/profiles/{id}',
      PARAMS: ['id'],
      METHOD: 'PUT'
    }
  },
  SESSIONS: {
    GET_SESSIONS: {
      URL: 'api/sessions',
      METHOD: 'GET'
    },
    CREATE: {
      URL: 'api/sessions',
      METHOD: 'POST'
    },
    EDIT: {
      URL: 'api/sessions/{id}',
      PARAMS: ['id'],
      METHOD: 'PUT'
    },
    EDIT_STATUS: {
      URL: 'api/sessions/{id}/status',
      PARAMS: ['id'],
      METHOD: 'PATCH'
    },
    DELETE: {
      URL: 'api/sessions/{id}',
      PARAMS: ['id'],
      METHOD: 'DELETE'
    }
  },
  SESSION_PARTICIPANTS: {
    JOIN: {
      URL: 'api/session_participants',
      METHOD: 'POST'
    },
    LEAVE: {
      URL: 'api/session_participants/{id}',
      PARAMS: ['id'],
      METHOD: 'DELETE'
    },
    EDIT_PRESENCE: {
      URL: 'api/session_participants/{id}/present',
      PARAMS: ['id'],
      METHOD: 'PATCH'
    }
  },
  NOTIFICATIONS: {
    GET_NOTIFICATIONS: {
      URL: 'api/notifications',
      METHOD: 'GET'
    },
    CREATE: {
      URL: 'api/notifications',
      METHOD: 'POST'
    },
    EDIT_STATUS: {
      URL: 'api/notifications/{id}/status',
      PARAMS: ['id'],
      METHOD: 'PATCH'
    }
  },
  PAYMENTS: {
    CREATE: {
      URL: 'api/payments',
      METHOD: 'POST'
    },
    VERIFY: {
      URL: 'api/payments/verify',
      METHOD: 'POST'
    }
  },
  CONFIG: {
    GET: {
      URL: 'api/config/{key}',
      PARAMS: ['key'],
      METHOD: 'GET'
    },
    CREATE: {
      URL: 'api/config',
      METHOD: 'POST'
    }
  }
};
