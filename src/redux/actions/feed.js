import posts_services from '../../services/posts_services';
import utils from '../../utils/utils';

export const FETCH_FEED = 'FETCH_FEED';
export const FETCH_FEED_PENDING = 'FETCH_FEED_PENDING';
export const FETCH_FEED_FULFILLED = 'FETCH_FEED_FULFILLED';

export const FETCH_FEED_FROM_GESTURE = 'FETCH_FEED_FROM_GESTURE';
export const FETCH_FEED_FROM_GESTURE_PENDING =
  'FETCH_FEED_FROM_GESTURE_PENDING';
export const FETCH_FEED_FROM_GESTURE_FULFILLED =
  'FETCH_FEED_FROM_GESTURE_FULFILLED';
export const FETCH_FEED_FROM_GESTURE_REJECTED =
  'FETCH_FEED_FROM_GESTURE_REJECTED';

export const ADD_TO_FEED = 'ADD_TO_FEED';
export const ADD_TO_FEED_PENDING = 'ADD_TO_FEED_PENDING';
export const ADD_TO_FEED_FULFILLED = 'ADD_TO_FEED_FULFILLED';
export const LOADING = 'LOADING';

const url = 'users/';

//action creators

export function fetchFeed(page, pages) {
  return {
    type: FETCH_FEED,
    payload: posts_services.list(
      pages[Math.min(page, pages.length - 1)],
      utils.getPageOffset(Math.min(page, pages.length - 1), pages),
    ),
  };
}

export function fetchFeedFromGesture(page, pages) {
  return {
    type: FETCH_FEED_FROM_GESTURE,
    payload: posts_services.list(
      pages[Math.min(page, pages.length - 1)],
      utils.getPageOffset(Math.min(page, pages.length - 1), pages),
    ),
  };
}

export function addToFeed(page, pages) {
  return {
    type: ADD_TO_FEED,
    payload: posts_services.list(
      pages[Math.min(page, pages.length - 1)],
      utils.getPageOffset(Math.min(page, pages.length - 1), pages),
    ),
  };
}
