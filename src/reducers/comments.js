import { createSlice } from '@reduxjs/toolkit';
import { adapt } from '../utils/normalizedDataAdaptator';

const initialState = {
  byId: {},
  allIds: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {
    setComments: (comments, action) => {
      comments = adapt(action.payload);
      return comments;
    },
    addComments: (comments, action) => {
      const newComments = adapt(action.payload);
      comments.byId = {...comments.byId, ...newComments.byId};
      comments.allIds = [...comments.allIds, ...newComments.allIds];
      return comments;
    },
    resetComments: (comments) => {
      comments = initialState;
      return comments;
    },
  },
});

export const {setComments, addComments, resetComments} = commentsSlice.actions;

export const getComments = (state) => state.comments.allIds;
export const getComment = (id) => (state) => state.comments.byId[id.toString()];

export default commentsSlice.reducer;
