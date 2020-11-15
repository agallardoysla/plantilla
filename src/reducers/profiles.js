import { createSlice } from '@reduxjs/toolkit';
import { adapt } from '../utils/normalizedDataAdaptator';

const initialState = {
  byId: {},
  allIds: [],
};

export const profilesSlice = createSlice({
  name: 'profiles',
  initialState: initialState,
  reducers: {
    setProfiles: (profiles, action) => {
      profiles = adapt(action.payload);
      return profiles;
    },
    addProfiles: (profiles, action) => {
      const newProfiles = adapt(action.payload);
      profiles.byId = {...profiles.byId, ...newProfiles.byId};
      profiles.allIds = [...profiles.allIds, ...newProfiles.allIds];
      return profiles;
    },
    resetProfiles: (profiles) => {
      profiles = initialState;
      return profiles;
    },
  },
});

export const {setProfiles, addProfiles, resetProfiles} = profilesSlice.actions;

export const getProfiles = (state) => state.profiles.allIds;
export const getProfile = (id) => (state) => state.profiles.byId[id.toString()];

export default profilesSlice.reducer;
