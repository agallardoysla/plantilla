import {createSlice} from '@reduxjs/toolkit';

export const otherUserSlice = createSlice({
  name: 'otherUser',
  initialState: null,
  reducers: {
    updateOtherUser: (otherUser, action) => {
      otherUser = action.payload;
      return otherUser;
    },
    setReactions: (otherUser, action) => {
      otherUser.reactions = action.payload;
      return otherUser;
    },
    addReaction: (otherUser, action) => {
      otherUser.reactions = [otherUser.reactions, action.payload];
      return otherUser;
    },
    removeReaction: (otherUser, action) => {
      otherUser.reactions = otherUser.reactions.slice(-1);
      return otherUser;
    },
    followOtherUser: (otherUser, action) => {
      const loggedUser = {user_id: action.payload.id, ...action.payload};
      otherUser.followers_with_details.push(loggedUser);
      return otherUser;
    },
    unfollowOtherUser: (otherUser, action) => {
      otherUser.followers_with_details = otherUser.followers_with_details.filter(
        (f) => f.user_id !== action.payload.id,
      );
      return otherUser;
    },
  },
});

export const {
  updateOtherUser,
  setReactions,
  addReaction,
  removeReaction,
  followOtherUser,
  unfollowOtherUser,
} = otherUserSlice.actions;

export const getOtherUser = (state) => state.otherUser;

export const getOtherUserFollowers = (state) => state.otherUser.followers_with_details;

export const getOtherUserFolloweds = (state) => state.otherUser.following_with_details;

export default otherUserSlice.reducer;
