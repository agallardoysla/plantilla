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
        (f) => f.user_id !== action.payload.user_id,
      );
      return loggedUser;
    },
    otherUserFollowLoggedUser: (loggedUser, action) => {
      loggedUser.followers_with_details.push(action.payload);
      return loggedUser;
    },
    addVip: (loggedUser, action) => {
      loggedUser.followers_with_details = loggedUser.followers_with_details.map(
        (follower) => {
          if (follower.user_id === action.payload) {
            follower.is_vip = true;
          }
          return follower;
        },
      );
      return loggedUser;
    },
    removeVip: (loggedUser, action) => {
      loggedUser.followers_with_details = loggedUser.followers_with_details.map(
        (follower) => {
          if (follower.user_id === action.payload) {
            follower.is_vip = false;
          }
          return follower;
        },
      );
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
  addVip,
  removeVip,
} = loggedUserSlice.actions;

export const getLoggedUser = (state) => state.session.user;

export const getLoggedUserReactions = (state) => state.session.user.reactions;

export const getLoggedUserFollowers = (state) => state.session.user.followers_with_details;

export const getLoggedUserFolloweds = (state) => state.session.user.following_with_details;

export const getLoggedUserVips = (state) => state.session.user.followers_with_details.filter((f) => f.is_vip);

export default loggedUserSlice.reducer;
