import {createSlice} from '@reduxjs/toolkit';

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: [],
  reducers: {
    setConversations: (conversations, action) => {
      conversations = action.payload;
      return conversations;
    },
    addNotification: (conversations, action) => {
      conversations = [...conversations, action.payload];
      return conversations;
    },
    resetConversations: (conversations) => {
      conversations = [];
      return conversations;
    },
  },
});

export const {
  setConversations,
  addNotification,
  resetConversations,
} = conversationsSlice.actions;

export const getConversations = (state) => state.conversations;

export default conversationsSlice.reducer;
