import {createSlice} from '@reduxjs/toolkit';

export const otherUserSlice = createSlice({
  name: 'otherUser',
  initialState: null,
  reducers: {
    updateOtherUser: (otherUser, action) => {
      otherUser = action.payload;
      return otherUser;
    },
    followOtherUser: (otherUser, action) => {
      otherUser.followers_with_details.push(action.payload);
      return otherUser;
    },
    unfollowOtherUser: (otherUser, action) => {
      otherUser.followers_with_details = otherUser.followers_with_details.filter(
        (f) => f.user_id !== action.payload.user_id,
      );
      return otherUser;
    },
  },
});

export const {
  updateOtherUser,
  followOtherUser,
  unfollowOtherUser,
} = otherUserSlice.actions;

export const getOtherUser = (state) => state.otherUser;

export const getOtherUserFollowers = (state) => state.otherUser.followers_with_details;

export const getOtherUserFolloweds = (state) => state.otherUser.following_with_details;

export default otherUserSlice.reducer;
