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
    likePost: (posts, action) => {
      posts = posts.map((p) => {
        if (p.id === action.payload.id) {
          p.reactionscount.REACTION_TYPE_PRUEBA++;
        }
        return p;
      });
    },
    unlikePost: (posts, action) => {
      posts = posts.map((p) => {
        if (p.id === action.payload.id) {
          p.reactionscount.REACTION_TYPE_PRUEBA--;
        }
        return p;
      });
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

export const getPosts = (state) => state.posts;

export const getPostLikes = (post) => (state) => {
  const statePost = state.posts.filter((p) => p.id === post.id)[0];
  return statePost.reactionscount.REACTION_TYPE_PRUEBA
    ? statePost.reactionscount.REACTION_TYPE_PRUEBA
    : 0;
};

export default postsSlice.reducer;
