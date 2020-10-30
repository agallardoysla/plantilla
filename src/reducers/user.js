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
  },
});

export const {
  login,
  logout,
  update,
  followUser,
  unfollowUser,
} = userSlice.actions;

export const getUser = (state) => state.user;

export default userSlice.reducer;
