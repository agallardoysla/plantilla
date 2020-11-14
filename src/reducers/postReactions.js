import { createSlice } from '@reduxjs/toolkit';

export const postReactionsSlice = createSlice({
  name: 'postReactions',
  initialState: [],
  reducers: {
    setPostReactions: (postReactions, action) => {
      postReactions = action.payload;
      return postReactions;
    },
    addPostReactions: (postReactions, action) => {
      postReactions = [...postReactions, ...action.payload];
      return postReactions;
    },
    resetPostReactions: (postReactions) => {
      postReactions = [];
      return postReactions;
    },
  },
});

export const {setPostReactions, addPostReactions, resetPostReactions} = postReactionsSlice.actions;

export const getPostReactions = (state) => state.postReactions.allIds;
export const getPostReaction = (id) => (state) => state.postReactions.byId[id.toString()];

export default postReactionsSlice.reducer;
