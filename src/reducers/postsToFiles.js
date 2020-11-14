import { createSlice } from '@reduxjs/toolkit';

export const postToFilesSlice = createSlice({
  name: 'postToFiles',
  initialState: [],
  reducers: {
    setPostToFiles: (postToFiles, action) => {
      postToFiles = action.payload;
      return postToFiles;
    },
    addPostToFiles: (postToFiles, action) => {
      postToFiles = [...postToFiles, ...action.payload];
      return postToFiles;
    },
    resetPostToFiles: (postToFiles) => {
      postToFiles = [];
      return postToFiles;
    },
  },
});

export const {setPostToFiles, addPostToFiles, resetPostToFiles} = postToFilesSlice.actions;

export const getPostToFiles = (state) => state.postToFiles.allIds;
export const getPostToFile = (id) => (state) => state.postToFiles.byId[id.toString()];

export default postToFilesSlice.reducer;
