import { createSlice } from '@reduxjs/toolkit';
import { adapt } from '../utils/normalizedDataAdaptator';

const initialState = {
  byId: {},
  reloadPost: {},
  allIds: [],
};

export const postReactionsSlice = createSlice({
  name: 'postReactions',
  initialState: initialState,
  reducers: {
    setPostReactions: (postReactions, action) => {
      postReactions = adapt(action.payload);
      return postReactions;
    },
    addPostReactions: (postReactions, action) => {
      const newPostReactions = adapt(action.payload);
      postReactions.byId = {...postReactions.byId, ...newPostReactions.byId};
      postReactions.allIds = [...postReactions.allIds, ...newPostReactions.allIds];
      return postReactions;
    },
    resetPostReactions: (postReactions) => {
      postReactions = initialState;
      return postReactions;
    },
    removePostReaction: (postReactions, action) => {
      delete postReactions.byId[action.payload.toString()];
      postReactions.allIds = postReactions.allIds.filter((pr) => pr !== action.payload.toString());
      return postReactions;
    },
  },
});

export const {
  setPostReactions,
  addPostReactions,
  resetPostReactions,
  removePostReaction,
} = postReactionsSlice.actions;

// Solo se pueden obtener las reacciones asociadas a un Post
export const getPostReactions = (postId) => (state) => Object.values(state.postReactions.byId).filter(c => c.post_id.toString() === postId);
export const getPostReaction = (id) => (state) => state.postReactions.byId[id.toString()];
export const createPostReaction = (post_id, user_id) => ({
  id: Math.random(),
  created_at: new Date(),
  is_show: true,
  post_id,
  reaction_type_id: null,
  user_id,
  is_notificated: true,
});

export default postReactionsSlice.reducer;
