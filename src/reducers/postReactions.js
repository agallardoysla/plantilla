import { createSlice } from '@reduxjs/toolkit';
import { adapt } from '../utils/normalizedDataAdaptator';

const initialState = {
  byId: {},
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
  },
});

export const {setPostReactions, addPostReactions, resetPostReactions} = postReactionsSlice.actions;

export const getPostReactions = (state) => state.postReactions.allIds;
export const getPostReaction = (id) => (state) => state.postReactions.byId[id.toString()];

export default postReactionsSlice.reducer;
