import {FETCH_FEED_FULFILLED, FETCH_FEED_PENDING} from '../actions/feed';

const defaultState = {
  fetching: false,
  feed: [],
  feedFiles: [],
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case FETCH_FEED_FULFILLED:
      return {
        ...state,
        feed: action.payload.data,
        fetching: false

      };
    case FETCH_FEED_PENDING:
      return {
        ...state,
        fetching: true,
      };
    default:
      return state;
  }
}
