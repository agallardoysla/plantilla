import {combineReducers} from 'redux';
import session from './session';
import feed from './feed';
import postDetails from './postDetails';
import otherProfile from './otherProfile';

export default combineReducers({session, feed, postDetails, otherProfile});

import conversations from './conversations';

export default combineReducers({
  session, 
  feed, 
  postDetails,
  conversations,
});
