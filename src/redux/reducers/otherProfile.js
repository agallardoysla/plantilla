import {
  GET_OTHER_USER_PENDING,
  GET_OTHER_USER_FULFILLED,
  GET_OTHER_USER_REJECTED,
} from '../actions/otherProfile';

const defaultState = {
  user: {},
  fetching: true,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_OTHER_USER_PENDING:
      return {
        ...state,
        fetching: true,
      };
    case GET_OTHER_USER_FULFILLED:
      return {
        ...state,
        fetching: false,
        user: action.payload.data,
      };
    case GET_OTHER_USER_REJECTED:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
}
