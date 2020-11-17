import { createSlice } from '@reduxjs/toolkit';
import { adapt } from '../utils/normalizedDataAdaptator';
import {anySatisfy} from '../utils/utils';

const initialState = {
  byId: {},
  allIds: [],
};

export const filesSlice = createSlice({
  name: 'files',
  initialState: initialState,
  reducers: {
    setFiles: (files, action) => {
      files = adapt(action.payload);
      return files;
    },
    addFiles: (files, action) => {
      const newFiles = adapt(action.payload);
      files.byId = {...files.byId, ...newFiles.byId};
      files.allIds = [...files.allIds, ...newFiles.allIds];
      return files;
    },
    resetFiles: (files) => {
      files = initialState;
      return files;
    },
  },
});

export const {setFiles, addFiles, resetFiles} = filesSlice.actions;

export const getFiles = (state) => state.files.allIds;
export const getFile = (id) => (state) => id ? state.files.byId[id.toString()] : null;
export const getFilesFromIds = (ids) => (state) => {
  const res = ids.map(id => state.files.byId[id.file_id.toString()]);
  return anySatisfy(res, undefined) ? [] : res;
};

export default filesSlice.reducer;
