import {createSlice} from '@reduxjs/toolkit';

export const showSharePostSlice = createSlice({
  name: 'showSharePost',
  initialState: false,
  reducers: {
    setShowSharePost: (showSharePost, action) => {
      showSharePost = action.payload;
      return showSharePost;
    },
  },
});

export const {setShowSharePost} = showSharePostSlice.actions;

export const getShowSharePost = (state) => state.showSharePost;

export default showSharePostSlice.reducer;
