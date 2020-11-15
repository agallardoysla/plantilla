import {createSlice} from '@reduxjs/toolkit';
import { adapt } from '../utils/normalizedDataAdaptator';

const initialState = {
  byId: {},
  allIds: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    setPosts: (posts, action) => {
      posts = adapt(action.payload);
      return posts;
    },
    addPosts: (posts, action) => {
      const newPosts = adapt(action.payload);
      posts.byId = {...posts.byId, ...newPosts.byId};
      posts.allIds = [...posts.allIds, ...newPosts.allIds];
      return posts;
    },
    resetPosts: (posts) => {
      posts = initialState;
      return posts;
    },
  },
});

export const {
  setPosts,
  addPosts,
  resetPosts,
  likePost,
  unlikePost,
} = postsSlice.actions;

export const getPosts = (state) => state.posts.allIds;
export const getPost = (id) => (state) => state.posts.byId[id.toString()];

export const getPostLikes = (post) => (state) => {
  const statePost = state.posts.filter((p) => p.id === post.id)[0];
  return statePost.reactionscount.REACTION_TYPE_PRUEBA
    ? statePost.reactionscount.REACTION_TYPE_PRUEBA
    : 0;
};

export default postsSlice.reducer;
