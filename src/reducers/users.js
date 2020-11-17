import { createSlice } from '@reduxjs/toolkit';
import { adapt } from '../utils/normalizedDataAdaptator';

<<<<<<< HEAD
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

=======
const initialState = {
  byId: {},
  allIds: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setUsers: (users, action) => {
      users = adapt(action.payload);
      return users;
    },
    addUsers: (users, action) => {
      const newUsers = adapt(action.payload);
      users.byId = {...users.byId, ...newUsers.byId};
      users.allIds = [...users.allIds, ...newUsers.allIds];
      return users;
    },
    resetUsers: (users) => {
      users = initialState;
      return users;
    },
  },
});

export const {setUsers, addUsers, resetUsers} = usersSlice.actions;

export const getUsers = (state) => state.users.allIds;
export const getFullUsers = (state) => state.users.byId;
export const getUser = (id) => (state) => state.users.byId[id.toString()];

>>>>>>> integracion
export default usersSlice.reducer;
