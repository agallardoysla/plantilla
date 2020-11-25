import {LOGIN_USER_FULFILLED, LOGIN_USER_PENDING} from '../actions/session';

const defaultState = {
  allPosts: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case LOGIN_USER_FULFILLED:
      console.log('LOGIN_USER_FULFILLED payload: ', action.payload)
      return {
        ...state,
        user: action.payload.data,
        userExists: true,
        config: action.payload.config,
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
