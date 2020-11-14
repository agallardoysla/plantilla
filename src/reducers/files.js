import { createSlice } from '@reduxjs/toolkit';

export const filesSlice = createSlice({
  name: 'files',
  initialState: [],
  reducers: {
    setFiles: (files, action) => {
      files = action.payload;
      return files;
    },
    addFiles: (files, action) => {
      files = [...files, ...action.payload];
      return files;
    },
    resetFiles: (files) => {
      files = [];
      return files;
    },
  },
});

export const {setFiles, addFiles, resetFiles} = filesSlice.actions;

export const getFiles = (state) => state.files.allIds;
export const getFile = (id) => (state) => state.files.byId[id.toString()];

export default filesSlice.reducer;
