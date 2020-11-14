import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (users, action) => {
      users = action.payload;
      return users;
    },
    addUsers: (users, action) => {
      users = [...users, ...action.payload];
      return users;
    },
    resetUsers: (users) => {
      users = [];
      return users;
    },
  },
});

export const {setUsers, addUsers, resetUsers} = usersSlice.actions;

export const getUsers = (state) => state.users.allIds;
export const getUser = (id) => (state) => state.users.byId[id.toString()];

export default usersSlice.reducer;
