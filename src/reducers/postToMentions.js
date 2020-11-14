import { createSlice } from '@reduxjs/toolkit';

export const postToMentionsSlice = createSlice({
  name: 'postToMentions',
  initialState: [],
  reducers: {
    setPostToMentions: (postToMentions, action) => {
      postToMentions = action.payload;
      return postToMentions;
    },
    addPostToMentions: (postToMentions, action) => {
      postToMentions = [...postToMentions, ...action.payload];
      return postToMentions;
    },
    resetPostToMentions: (postToMentions) => {
      postToMentions = [];
      return postToMentions;
    },
  },
});

export const {setPostToMentions, addPostToMentions, resetPostToMentions} = postToMentionsSlice.actions;

export const getPostToMentions = (state) => state.postToMentions.allIds;
export const getPostToMention = (id) => (state) => state.postToMentions.byId[id.toString()];

export default postToMentionsSlice.reducer;
