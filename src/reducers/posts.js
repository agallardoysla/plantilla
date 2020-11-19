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
    likePost: (posts, action) => {
      posts.byId[action.payload.postId.toString()].reactions.push(action.payload.reactionId);
    },
    unlikePost: (posts, action) => {
      posts.byId[action.payload.postId.toString()].reactions = posts.byId[
        action.payload.postId.toString()
      ].reactions.filter(
        (r) => r.toString() !== action.payload.reactionId.toString(),
      );
    },
    commentPost: (posts, action) => {
      posts.byId[action.payload.postId.toString()].comments.push(action.payload.commentId);
    },
    deleteCommentPost: (posts, action) => {
      posts.byId[action.payload.postId.toString()].comments = posts.byId[
        action.payload.postId.toString()
      ].comments.filter(
        (r) => r.toString() !== action.payload.commentId.toString(),
      );
    },
  },
});

export const {
  setPosts,
  addPosts,
  resetPosts,
  likePost,
  unlikePost,
  commentPost,
  deleteCommentPost,
} = postsSlice.actions;

export const getPosts = (state) => state.posts.allIds;
export const getPost = (id) => (state) => state.posts.byId[id.toString()];
export const getReactionsByPost = (id) => (state) => {
  const post = state.posts.byId[id.toString()];
  const reactions = post.reactions.map((r) => state.postReactions.byId[r.toString()]);
  console.log('post reactions', id, reactions);
  return reactions;
};

export default postsSlice.reducer;
