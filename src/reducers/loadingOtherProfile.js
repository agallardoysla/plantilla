import {createSlice} from '@reduxjs/toolkit';

export const loadingOtherProfileSlice = createSlice({
  name: 'loadingOtherProfile',
  initialState: false,
  reducers: {
    setLoadingOtherProfile: (loadingOtherProfile, action) => {
      loadingOtherProfile = action.payload;
      return loadingOtherProfile;
    },
  },
});

export const {setLoadingOtherProfile} = loadingOtherProfileSlice.actions;

export const getLoadingOtherProfile = (state) => state.loadingOtherProfile;

export default loadingOtherProfileSlice.reducer;
