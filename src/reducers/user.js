import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login: (user, action) => {
      user = action.payload;
      return user; // al ser initialState === null es necesario devolver el valor del nuevo estado en el 'init' (este es el unico metodo de inicio)
    },
    logout: (user) => {
      user = null;
    },
    followUser: (user, action) => {
      user.following_with_details.push(action.payload);
    },
    unfollowUser: (user, action) => {
      user.following_with_details = user.following_with_details.filter(
        (f) => f.user_id !== action.payload.user_id,
      );
    },
  },
});

export const {login, logout, followUser, unfollowUser} = userSlice.actions;

export const getUser = (state) => state.user;

export default userSlice.reducer;
