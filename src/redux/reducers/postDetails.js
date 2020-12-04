import {
  FETCH_POST_DETAILS_FULFILLED,
  FETCH_POST_DETAILS_PENDING,
} from '../actions/postDetails';

const defaultState = {
  fetching: false,
  post: {},
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case FETCH_POST_DETAILS_PENDING:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_POST_DETAILS_FULFILLED:
      return {
        ...state,
        fetching: false,
        post: action.payload,
      };
    default:
      return state;
  }
}
