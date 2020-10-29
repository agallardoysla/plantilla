import {createSlice} from '@reduxjs/toolkit';

export const searchedProfilesSlice = createSlice({
  name: 'searchedProfiles',
  initialState: [],
  reducers: {
    addSearchedProfiles: (searchedProfiles, action) => {
      searchedProfiles = [...searchedProfiles, ...action.payload];
      return searchedProfiles;
    },
    setSearchedProfiles: (searchedProfiles, action) => {
      searchedProfiles = action.payload;
      return searchedProfiles;
    },
    resetSearchedProfiles: (searchedProfiles) => {
      searchedProfiles = [];
      return searchedProfiles;
    },
  },
});

export const {
  addSearchedProfiles,
  setSearchedProfiles,
  resetSearchedProfiles,
} = searchedProfilesSlice.actions;

export const getSearchedProfiles = (state) => state.searchedProfiles;

export default searchedProfilesSlice.reducer;
