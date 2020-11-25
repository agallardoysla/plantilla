import posts_services from '../../services/posts_services';
import utils from '../../utils/utils';

export const FETCH_FEED = 'FETCH_FEED';
export const FETCH_FEED_PENDING = 'FETCH_FEED_PENDING';
export const FETCH_FEED_FULFILLED = 'FETCH_FEED_FULFILLED';
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
