import {
  RECOVER_SESSION_FULFILLED,
  RECOVER_SESSION_PENDING,
} from '../actions/session';

const defaultState = {
  loading: false,
  userExists: false,
  user: {},
  config: {},
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case RECOVER_SESSION_FULFILLED:
      console.log('RECOVER_SESSION_FULFILLED payload: ', action.payload);
      return {
        ...state,
        user: action.payload.data,
        userExists: true,
        config: action.payload.config,
        loading: false,
      };
    case RECOVER_SESSION_PENDING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
