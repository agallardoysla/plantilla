import {
  FETCH_FEED_FULFILLED,
  FETCH_FEED_PENDING,
  ADD_TO_FEED_PENDING,
  ADD_TO_FEED_FULFILLED,
} from '../actions/feed';

const defaultState = {
  fetching: false,
  addingToFeed: false,
  feed: [],
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case FETCH_FEED_FULFILLED:
      return {
        ...state,
        feed: action.payload.data,
        fetching: false,
      };
    case FETCH_FEED_PENDING:
      return {
        ...state,
        fetching: true,
      };
    case ADD_TO_FEED_FULFILLED:
      return {
        ...state,
        feed: [...state.feed, ...action.payload.data],
      };
    case ADD_TO_FEED_PENDING:
      return {
        ...state,
        addingToFeed: true,
      };
    default:
      return state;
  }
}
