import {LOGIN_USER_FULFILLED, LOGIN_USER_PENDING} from '../actions/session';

const defaultState = {
  loading: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case LOGIN_USER_FULFILLED:
      console.log('action.payload', action)
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case LOGIN_USER_PENDING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
