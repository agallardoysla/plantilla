import {createSlice} from '@reduxjs/toolkit';

export const postToShareSlice = createSlice({
  name: 'postToShare',
  initialState: null,
  reducers: {
    setPostToShare: (postToShare, action) => {
      postToShare = action.payload;
      return postToShare;
    },
  },
});

export const {setPostToShare} = postToShareSlice.actions;

export const getPostToShare = (state) => state.postToShare;

export default postToShareSlice.reducer;
