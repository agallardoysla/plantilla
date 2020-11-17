import { createSlice } from '@reduxjs/toolkit';
import { adapt } from '../utils/normalizedDataAdaptator';

const initialState = {
  byId: {},
  allIds: [],
};

export const postToMentionsSlice = createSlice({
  name: 'postToMentions',
  initialState: initialState,
  reducers: {
    setPostToMentions: (postToMentions, action) => {
      postToMentions = adapt(action.payload);
      return postToMentions;
    },
    addPostToMentions: (postToMentions, action) => {
      const newPostToMentions = adapt(action.payload);
      postToMentions.byId = {...postToMentions.byId, ...newPostToMentions.byId};
      postToMentions.allIds = [...postToMentions.allIds, ...newPostToMentions.allIds];
      return postToMentions;
    },
    resetPostToMentions: (postToMentions) => {
      postToMentions = initialState;
      return postToMentions;
    },
  },
});

export const {setPostToMentions, addPostToMentions, resetPostToMentions} = postToMentionsSlice.actions;

export const getPostToMentions = (state) => state.postToMentions.allIds;
export const getPostToMention = (id) => (state) => state.postToMentions.byId[id.toString()];

export default postToMentionsSlice.reducer;
