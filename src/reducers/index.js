import {combineReducers} from 'redux';

import user from './user';
import posts from './posts';
import searchedPosts from './searchedPosts';
import searchedProfiles from './searchedProfiles';

const rootReducer = combineReducers({
  user,
  posts,
  searchedPosts,
  searchedProfiles,
});

export default rootReducer;
