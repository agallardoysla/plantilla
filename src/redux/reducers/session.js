import {
  RECOVER_SESSION_FULFILLED,
  RECOVER_SESSION_PENDING,
  SET_USER,
} from '../actions/session';

const defaultState = {
  loading: false,
  userExists: false,
  user: {},
  config: {},
  tokeError: false
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
      case SET_USER: 
      return {
        ...state,
        user: action.payload,
        userExists: true,
        loading: false,
      }
    default:
      return state;
  }
}
