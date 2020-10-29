import {combineReducers} from 'redux';

import user from './user';
import posts from './posts';
import searchedPosts from './searchedPosts';
import searchedProfiles from './searchedProfiles';
import notifications from './notifications';

const rootReducer = combineReducers({
  user,
  posts,
  searchedPosts,
  searchedProfiles,
  notifications,
});

export default rootReducer;
