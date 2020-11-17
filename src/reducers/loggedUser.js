import {createSlice} from '@reduxjs/toolkit';

export const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState: null,
  reducers: {
    login: (loggedUser, action) => {
      loggedUser = action.payload;
      return loggedUser;
    },
    logout: (loggedUser) => {
      loggedUser = null;
      return loggedUser;
    },
    update: (loggedUser, action) => {
      loggedUser = action.payload;
      return loggedUser;
    },
    setReactions: (loggedUser, action) => {
      loggedUser.reactions = action.payload;
      return loggedUser;
    },
    addReaction: (loggedUser, action) => {
      loggedUser.reactions = [loggedUser.reactions, action.payload];
      return loggedUser;
    },
    setNewDisplayName: (loggedUser, action) => {
      loggedUser.display_name = action.payload;
      return loggedUser;
    },
    setNewProfileBio: (loggedUser, action) => {
      loggedUser.profile.bio = action.payload;
      return loggedUser;
    },
    followUser: (loggedUser, action) => {
      loggedUser.following_with_details.push(action.payload);
      return loggedUser;
    },
    unfollowUser: (loggedUser, action) => {
      loggedUser.following_with_details = loggedUser.following_with_details.filter(
        (f) => f.loggedUser_id !== action.payload.loggedUser_id,
      );
      return loggedUser;
    },
    otherUserFollowLoggedUser: (loggedUser, action) => {
      loggedUser.followers_with_details.push(action.payload);
      return loggedUser;
    },
  },
});

export const {
  login,
  logout,
  update,
  setReactions,
  addReaction,
  setNewDisplayName,
  setNewProfileBio,
  followUser,
  unfollowUser,
  otherUserFollowUser,
} = loggedUserSlice.actions;

export const getLoggedUser = (state) => state.loggedUser;

export const getLoggedUserReactions = (state) => state.loggedUser.reactions;

export const getLoggedUserFollowers = (state) => state.loggedUser.followers_with_details;

export const getLoggedUserFolloweds = (state) => state.loggedUser.following_with_details;

export default loggedUserSlice.reducer;
