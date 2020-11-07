import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login: (user, action) => {
      user = action.payload;
      return user;
    },
    logout: (user) => {
      user = null;
      return user;
    },
    update: (user, action) => {
      user = action.payload;
      return user;
    },
    setReactions: (user, action) => {
      user.reactions = action.payload;
      return user;
    },
    addReaction: (user, action) => {
      user.reactions = [user.reactions, action.payload];
      return user;
    },
    setNewDisplayName: (user, action) => {
      user.display_name = action.payload;
      return user;
    },
    setNewProfileBio: (user, action) => {
      user.profile.bio = action.payload;
      return user;
    },
    followUser: (user, action) => {
      user.following_with_details.push(action.payload);
      return user;
    },
    unfollowUser: (user, action) => {
      user.following_with_details = user.following_with_details.filter(
        (f) => f.user_id !== action.payload.user_id,
      );
      return user;
    },
    otherUserFollowUser: (user, action) => {
      user.followers_with_details.push(action.payload);
      return user;
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
} = userSlice.actions;

export const getUser = (state) => state.user;

export const getUserReactions = (state) => state.user.reactions;

export const getUserFollowers = (state) => state.user.followers_with_details;

export const getUserFolloweds = (state) => state.user.following_with_details;

export default userSlice.reducer;
