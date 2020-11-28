import posts_services from '../../services/posts_services';
import utils from '../../utils/utils';

export const FETCH_POST_DETAILS = 'FETCH_POST_DETAILS';
export const FETCH_POST_DETAILS_PENDING = 'FETCH_POST_DETAILS_PENDING';
export const FETCH_POST_DETAILS_FULFILLED = 'FETCH_POST_DETAILS_FULFILLED';
export const LOADING = 'LOADING';

//action creators

export function fetchPostDetails(id) {
  return {
    type: FETCH_POST_DETAILS,
    payload: posts_services.get(id)
  };
  
}
