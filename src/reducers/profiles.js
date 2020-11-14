import { createSlice } from '@reduxjs/toolkit';

export const profilesSlice = createSlice({
  name: 'profiles',
  initialState: [],
  reducers: {
    setProfiles: (profiles, action) => {
      profiles = action.payload;
      return profiles;
    },
    addProfiles: (profiles, action) => {
      profiles = [...profiles, ...action.payload];
      return profiles;
    },
    resetProfiles: (profiles) => {
      profiles = [];
      return profiles;
    },
  },
});

export const {setProfiles, addProfiles, resetProfiles} = profilesSlice.actions;

export const getProfiles = (state) => state.profiles.allIds;
export const getProfile = (id) => (state) => state.profiles.byId[id.toString()];

export default profilesSlice.reducer;
