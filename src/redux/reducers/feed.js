import {
  FETCH_FEED_FULFILLED,
  FETCH_FEED_PENDING,
  FETCH_FEED_FROM_GESTURE_FULFILLED,
  FETCH_FEED_FROM_GESTURE_PENDING,
  FETCH_FEED_FROM_GESTURE_REJECTED,
  ADD_TO_FEED_PENDING,
  ADD_TO_FEED_FULFILLED,
  ADD_COMMENT_PENDING,
  ADD_COMMENT_FULFILLED,
  ADD_COMMENT_REJECTED,
  UPDATE_PUBLICATION_PENDING,
  UPDATE_PUBLICATION_FULFILLED,
} from '../actions/feed';

const defaultState = {
  fetching: false,
  fetchingFromFeed: false,
  addingToFeed: false,
  addingComment: false,
  refreshData: false,
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
    case FETCH_FEED_FROM_GESTURE_FULFILLED:
      return {
        ...state,
        feed: [...action.payload.data, ...state.feed],
        fetchingFromFeed: false,
      };
    case FETCH_FEED_FROM_GESTURE_PENDING:
      return {
        ...state,
        fetchingFromFeed: true,
      };
    case FETCH_FEED_FROM_GESTURE_REJECTED:
      return {
        ...state,
        fetchingFromFeed: false,
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
    case ADD_COMMENT_PENDING:
      return {
        ...state,
        addingComment: true,
      };
    case ADD_COMMENT_FULFILLED:
      return {
        ...state,
        addingComment: false,
        refreshData: true,
      };
    case ADD_COMMENT_REJECTED:
      return {
        ...state,
        addingComment: false,
      };
    case UPDATE_PUBLICATION_PENDING:
      return {
        ...state,
        refreshData: true,
      };
    case UPDATE_PUBLICATION_FULFILLED:
      return {
        ...state,
        refreshData: false,
        feed: action.payload || [...state.feed],
      };
    default:
      return state;
  }
}
