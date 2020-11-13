import {createSlice} from '@reduxjs/toolkit';

export const loadingProfileSlice = createSlice({
  name: 'loadingProfile',
  initialState: false,
  reducers: {
    setLoadingProfile: (loadingProfile, action) => {
      loadingProfile = action.payload;
      return loadingProfile;
    },
  },
});

export const {setLoadingProfile} = loadingProfileSlice.actions;

export const getLoadingProfile = (state) => state.loadingProfile;

export default loadingProfileSlice.reducer;
