import { createSlice } from '@reduxjs/toolkit';
import { adapt } from '../utils/normalizedDataAdaptator';

const initialState = {
  byId: {},
  allIds: [],
};

export const postToSponsorsSlice = createSlice({
  name: 'postToSponsors',
  initialState: initialState,
  reducers: {
    setPostToSponsors: (postToSponsors, action) => {
      postToSponsors = adapt(action.payload);
      return postToSponsors;
    },
    addPostToSponsors: (postToSponsors, action) => {
      const newPostToSponsors = adapt(action.payload);
      postToSponsors.byId = {...postToSponsors.byId, ...newPostToSponsors.byId};
      postToSponsors.allIds = [...postToSponsors.allIds, ...newPostToSponsors.allIds];
      return postToSponsors;
    },
    resetPostToSponsors: (postToSponsors) => {
      postToSponsors = initialState;
      return postToSponsors;
    },
  },
});

export const {setPostToSponsors, addPostToSponsors, resetPostToSponsors} = postToSponsorsSlice.actions;

export const getPostToSponsors = (state) => state.postToSponsors.allIds;
export const getPostToSponsor = (id) => (state) => state.postToSponsors.byId[id.toString()];

export default postToSponsorsSlice.reducer;
