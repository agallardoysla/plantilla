import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  followers_with_details: [],
  following_with_details: [],
};

export const otherUserSlice = createSlice({
  name: 'otherUser',
  initialState: initialState,
  reducers: {
    updateOtherUser: (otherUser, action) => {
      otherUser = action.payload;
      return otherUser;
    },
    setOtherUserReactions: (otherUser, action) => {
      otherUser.reactions = action.payload;
      return otherUser;
    },
    addOtherUserReaction: (otherUser, action) => {
      otherUser.reactions = [otherUser.reactions, action.payload];
      return otherUser;
    },
    removeOtherUserReaction: (otherUser, action) => {
      otherUser.reactions = otherUser.reactions.filter((r) => r.user !== action.payload.user);
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
  setOtherUserReactions,
  addOtherUserReaction,
  removeOtherUserReaction,
  followOtherUser,
  unfollowOtherUser,
} = otherUserSlice.actions;

export const getOtherUser = (state) => state.otherProfile.user;

export const getOtherUserReactions = (state) => state.otherProfile.user.following_with_details

export const getOtherUserFollowers = (state) => state.otherProfile.user.followers_with_details;

export const getOtherUserFolloweds = (state) => state.otherProfile.user.following_with_details

export default otherUserSlice.reducer;
