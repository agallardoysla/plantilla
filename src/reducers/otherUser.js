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
      otherUser.following_with_details.push(action.payload);
      return otherUser;
    },
    unfollowOtherUser: (otherUser, action) => {
      otherUser.following_with_details = otherUser.following_with_details.filter(
        (f) => f.otherUser_id !== action.payload.otherUser_id,
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

export const getOtherUserFollowers = (state) => state.user.followers_with_details;

export const getOtherUserFolloweds = (state) => state.user.following_with_details;

export default otherUserSlice.reducer;
