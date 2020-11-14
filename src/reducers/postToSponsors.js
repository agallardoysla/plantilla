import { createSlice } from '@reduxjs/toolkit';

export const postToSponsorsSlice = createSlice({
  name: 'postToSponsors',
  initialState: [],
  reducers: {
    setPostToSponsors: (postToSponsors, action) => {
      postToSponsors = action.payload;
      return postToSponsors;
    },
    addPostToSponsors: (postToSponsors, action) => {
      postToSponsors = [...postToSponsors, ...action.payload];
      return postToSponsors;
    },
    resetPostToSponsors: (postToSponsors) => {
      postToSponsors = [];
      return postToSponsors;
    },
  },
});

export const {setPostToSponsors, addPostToSponsors, resetPostToSponsors} = postToSponsorsSlice.actions;

export const getPostToSponsors = (state) => state.postToSponsors.allIds;
export const getPostToSponsor = (id) => (state) => state.postToSponsors.byId[id.toString()];

export default postToSponsorsSlice.reducer;
