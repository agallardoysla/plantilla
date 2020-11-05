import {combineReducers} from 'redux';

import user from './user';
import posts from './posts';
import searchedPosts from './searchedPosts';
import searchedProfiles from './searchedProfiles';
import notifications from './notifications';
import conversations from './conversations';
import otherUser from './otherUser';

const rootReducer = combineReducers({
  user,
  posts,
  searchedPosts,
  searchedProfiles,
  notifications,
  conversations,
  otherUser,
});

export default rootReducer;
