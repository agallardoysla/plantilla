import { createSlice } from '@reduxjs/toolkit';

export const profilesSlice = createSlice({
    name: "profiles",
    initialState: [],
    reducers:{
        setProfiles: (profiles, action) => {
            profiles = action.payload
            return profiles
        },
        addProfiles: (profiles, action) => {
            profiles = [...profiles, ...action.payload]
            return profiles
        },
        resetProfiles: (profiles) => {
            profiles = []
            return profiles
        }
    }
})

export const {
    setProfiles,
    addProfiles,
    resetProfiles
} = profilesSlice.actions

export const getProfiles = state => state.profiles
export const getProfile = id => state => state.profiles.filter(p => p.id === id)[0]

export default profilesSlice.reducer