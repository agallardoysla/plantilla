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
        if (p.id === action.payload.postId) {
          if (p.reactionscount.REACTION_TYPE_PRUEBA) {
            p.reactionscount.REACTION_TYPE_PRUEBA++;
          } else {
            p.reactionscount.REACTION_TYPE_PRUEBA = 1;
          }
        }
        p.reactions_details.push({user_id: action.payload.userId});
        return p;
      });
    },
    unlikePost: (posts, action) => {
      posts = posts.map((p) => {
        if (p.id === action.payload.postId) {
          if (p.reactionscount.REACTION_TYPE_PRUEBA) {
            p.reactionscount.REACTION_TYPE_PRUEBA--;
          } else {
            p.reactionscount.REACTION_TYPE_PRUEBA = 0;
          }
        }
        p.reactions_details = p.reactions_details.filter(
          (r) => r.user_id !== action.payload.userId,
        );
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

export const getPost = (id) => (state) => state.posts.filter(p => p.id === id)[0];

export const getPostLikes = (post) => (state) => {
  const statePost = state.posts.filter((p) => p.id === post.id)[0];
  return statePost.reactionscount.REACTION_TYPE_PRUEBA
    ? statePost.reactionscount.REACTION_TYPE_PRUEBA
    : 0;
};

export default postsSlice.reducer;
