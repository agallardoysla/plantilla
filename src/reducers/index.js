import {combineReducers} from 'redux';

import user from './user';
import posts from './posts';
import searchedPosts from './searchedPosts';
import searchedProfiles from './searchedProfiles';
import notifications from './notifications';
import conversations from './conversations';
import otherUser from './otherUser';
import accounts from './accounts';
import loadingProfile from './loadingProfile';
import loadingOtherProfile from './loadingOtherProfile';
import comments from './comments';
import files from './files';
import post_reactions from './post_reactions';
import post_to_mentions from './post_to_mentions';
import post_to_sponsors from './post_to_sponsors';
import post_to_files from './posts_to_files';
import profiles from './profiles';
import list_users from './users';

const rootReducer = combineReducers({
  user,
  posts,
  searchedPosts,
  searchedProfiles,
  notifications,
  conversations,
  otherUser,
  accounts,
  loadingProfile,
  loadingOtherProfile,
  comments,
  files,
  post_reactions,
  post_to_mentions,
  post_to_sponsors,
  post_to_files,
  profiles,
  list_users
});

export default rootReducer;
