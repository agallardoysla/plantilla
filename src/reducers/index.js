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
import postReactions from './postReactions';
import postToMentions from './postToMentions';
import postToSponsors from './postToSponsors';
import postToFiles from './postsToFiles';
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
  postReactions,
  postToMentions,
  postToSponsors,
  postToFiles,
  profiles,
  list_users,
});

export default rootReducer;
