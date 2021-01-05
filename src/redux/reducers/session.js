import {
  GET_SESSION_ACTIVE,
  LOGIN_FULFILLED,
  LOGIN_PENDING,
  LOGIN_REJECTED,
  LOGOUT_FULFILLED,
  LOGOUT_PENDING,
  LOGOUT_REJECTED,
  RECOVER_SESSION_FULFILLED,
  RECOVER_SESSION_PENDING,
  RECOVER_SESSION_REJECTED,
} from '../actions/session';

const defaultState = {
  loading: false,
  isSessionActive: false,
  userExists: false,
  user: {},
  config: {},
  tokeError: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case RECOVER_SESSION_FULFILLED:
      return {
        ...state,
        user: action.payload.data,
        userExists: true,
        config: action.payload.config,
        loading: false,
        // tokenError,
      };
    case RECOVER_SESSION_PENDING:
      return {
        ...state,
        loading: true,
      };
    case RECOVER_SESSION_REJECTED:
      return {
        ...state,
        loading: false,
        userExists: false,
      };

    case LOGIN_FULFILLED:
      //console.log('action.payload LOGIN_FULFILLED', action.payload);
      return {
        ...state,
        isSessionActive: action.payload !== undefined,
      };
    case LOGIN_PENDING:
      //console.log('action.payload LOGIN_PENDING', action.payload);

      return {
        ...state,
      };
    case LOGIN_REJECTED:
      //console.log('action.payload LOGIN_REJECTED', action.payload);

      return {
        ...state,
      };

    case LOGOUT_PENDING:
      return {
        ...state,
      };

    case LOGOUT_FULFILLED:
      return {
        ...defaultState,
      };

    case LOGOUT_REJECTED:
      return {
        ...state,
      };

    case GET_SESSION_ACTIVE:
      //console.log('action.payload GET_SESSION_ACTIVE', action.payload);
      return {
        ...state,
        isSessionActive: action.payload,
      };
    default:
      return state;
  }
}

export const getSessionIsActive = (state) => state.session.isSessionActive;

export const getLoggedUser = (state) => state.session.user;
