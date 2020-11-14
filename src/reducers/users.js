import { createSlice } from '@reduxjs/toolkit';

export const listUsersSlice = createSlice({
    name: "list_users",
    initialState: [],
    reducers: {
        setUsers: (users, action) => {
            users = action.payload
            return users
        },
        addUsers: (users, action) => {
            users = [...users, ...action.payload]
            return users
        },
        resetUsers: (users) => {
            users = []
            return users
        }
    }
})

export const {
    setUsers,
    addUsers,
    resetUsers
} = listUsersSlice.actions

export const getListUsers = state => state.users
export const getListUser = id => state => state.users.filter(u => u.id === id)[0]

export default listUsersSlice.reducer