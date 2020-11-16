import { createSlice } from '@reduxjs/toolkit';
import { adapt } from '../utils/normalizedDataAdaptator';

const initialState = {
  byId: {},
  allIds: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {
    setComments: (comments, action) => {
      comments = adapt(action.payload);
      return comments;
    },
    addComments: (comments, action) => {
      const newComments = adapt(action.payload);
      comments.byId = {...comments.byId, ...newComments.byId};
      comments.allIds = [...comments.allIds, ...newComments.allIds];
      return comments;
    },
    resetComments: (comments) => {
      comments = initialState;
      return comments;
    },
    removeComment: (comments, action) => {
      delete comments.byId[action.payload.toString()];
      comments.allIds = comments.allIds.filter((pr) => pr !== action.payload.toString());
      return comments;
    },
  },
});

export const {
  setComments,
  addComments,
  resetComments,
  removeComment,
} = commentsSlice.actions;

export const getComments = (state) => state.comments.allIds;
export const getComment = (id) => (state) => state.comments.byId[id.toString()];
export const getPostComments = (postId) => (state) =>
  Object.values(state.comments.byId).filter(
    (c) => c.post_id.toString() === postId && c.original_comment_id === null,
  );
export const getCommentAnswers = (commentId) => (state) =>
  Object.values(state.comments.byId).filter(
    (c) =>
      c.original_comment_id && c.original_comment_id.toString() === commentId,
  );

export default commentsSlice.reducer;
