import {createSlice} from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    addPosts: (posts, action) => {
      posts = [...posts, ...action.payload];
      return posts;
    },
    resetPosts: (posts) => {
      posts = [];
      return posts;
    },
  },
});

export const {
  addPosts,
  resetPosts,
} = postsSlice.actions;

export const getPosts = (state) => state.posts;

export default postsSlice.reducer;
