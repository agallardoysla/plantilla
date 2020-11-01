import {createSlice} from '@reduxjs/toolkit';

export const searchedPostsSlice = createSlice({
  name: 'searchedPosts',
  initialState: [],
  reducers: {
    addSearchedPosts: (searchedPosts, action) => {
      searchedPosts = [...searchedPosts, ...action.payload];
      return searchedPosts;
    },
    resetSearchedPosts: (searchedPosts) => {
      searchedPosts = [];
      return searchedPosts;
    },
  },
});

export const {
  addSearchedPosts,
  resetSearchedPosts,
} = searchedPostsSlice.actions;

export const getSearchedPosts = (state) => state.searchedPosts;

export default searchedPostsSlice.reducer;
