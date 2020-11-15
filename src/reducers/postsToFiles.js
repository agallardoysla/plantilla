import { createSlice } from '@reduxjs/toolkit';
import { adapt } from '../utils/normalizedDataAdaptator';

const initialState = {
  byId: {},
  allIds: [],
};

export const postToFilesSlice = createSlice({
  name: 'postToFiles',
  initialState: initialState,
  reducers: {
    setPostToFiles: (postToFiles, action) => {
      postToFiles = adapt(action.payload);
      return postToFiles;
    },
    addPostToFiles: (postToFiles, action) => {
      const newPostToFiles = adapt(action.payload);
      postToFiles.byId = {...postToFiles.byId, ...newPostToFiles.byId};
      postToFiles.allIds = [...postToFiles.allIds, ...newPostToFiles.allIds];
      return postToFiles;
    },
    resetPostToFiles: (postToFiles) => {
      postToFiles = initialState;
      return postToFiles;
    },
  },
});

export const {setPostToFiles, addPostToFiles, resetPostToFiles} = postToFilesSlice.actions;

export const getPostToFiles = (state) => state.postToFiles.allIds;
export const getPostToFile = (id) => (state) => state.postToFiles.byId[id.toString()];
export const getPostToFilesByPost = (postId) => (state) => Object.values(state.postToFiles.byId).filter(c => c.post_id === postId);

export default postToFilesSlice.reducer;
