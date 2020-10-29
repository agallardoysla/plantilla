import {createSlice} from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    addPosts: (posts, action) => {
      posts = [...posts, ...action.payload];
      return posts; // al ser initialState === [] es necesario devolver el valor del nuevo estado en el 'init' (este es el unico metodo de inicio)
    },
    reset: (posts) => {
      posts = [];
    },
  },
});

export const {
  addPosts,
  reset,
} = postsSlice.actions;

export const getPosts = (state) => state.posts;

export default postsSlice.reducer;
