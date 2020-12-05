import comments_services from '../../services/comments_services';
import posts_services from '../../services/posts_services';
import utils from '../../utils/utils';
import {_} from 'lodash';

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

export const ADD_REACTION = 'ADD_REACTION';
export const ADD_REACTION_PENDING = 'ADD_REACTION_PENDING';
export const ADD_REACTION_FULFILLED = 'ADD_REACTION_FULFILLED';

export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENT_PENDING = 'ADD_COMMENT_PENDING';
export const ADD_COMMENT_FULFILLED = 'ADD_COMMENT_FULFILLED';

export const REMOVE_REACTION = 'REMOVE_REACTION';
export const REMOVE_REACTION_PENDING = 'REMOVE_REACTION_PENDING';
export const REMOVE_REACTION_FULFILLED = 'REMOVE_REACTION_FULFILLED';

export const UPDATE_PUBLICATION = 'UPDATE_PUBLICATION';
export const UPDATE_PUBLICATION_PENDING = 'UPDATE_PUBLICATION_PENDING';
export const UPDATE_PUBLICATION_FULFILLED = 'UPDATE_PUBLICATION_FULFILLED';

export function fetchFeed(pageSize, offset) {
  return {
    type: FETCH_FEED,
    payload: posts_services.list(pageSize, offset),
  };
}

export function fetchFeedFromGesture(pageSize, offset) {
  return {
    type: FETCH_FEED_FROM_GESTURE,
    payload: posts_services.list(pageSize, offset),
  };
}

export function addToFeed(pageSize, offset) {
  return {
    type: ADD_TO_FEED,
    payload: posts_services.list(pageSize, offset),
  };
}
export function reactToPublication(publicationId, reacted) {
  if (reacted) {
    return {
      type: ADD_REACTION,
      payload: posts_services.addReaction(publicationId, 2),
    };
  }
  return {
    type: REMOVE_REACTION,
    payload: posts_services.deleteReaction(publicationId),
  };
}

export function addComment(data) {
  return {
    type: ADD_COMMENT,
    payload: comments_services.create(data),
  };
}

export function updatePublication(feed, id) {
  return {
    type: UPDATE_PUBLICATION,
    payload: posts_services.get(id).then((resp) => {
      try {
        console.log('feed', feed);
        const updatedData = _.merge(feed, resp.data);
        console.log('updatedData', updatedData);
        return updatedData;
      } catch (e) {
        console.log('e', e);
        return feed;
      }
    }),
  };
}
