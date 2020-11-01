import {createSlice} from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    setPosts: (posts, action) => {
      posts = action.payload;
      return posts;
    },
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
  setPosts,
  addPosts,
  resetPosts,
} = postsSlice.actions;

export const getPosts = (state) => state.posts;

export default postsSlice.reducer;
