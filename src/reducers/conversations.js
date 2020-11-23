import {createSlice} from '@reduxjs/toolkit';

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: [],
  reducers: {
    setConversations: (conversations, action) => {
      conversations = action.payload;
      return conversations;
    },
    resetConversations: (conversations) => {
      conversations = [];
      return conversations;
    },
    addConversation: (conversations, action) => {
      return [...conversations, action.payload];
    },
    setNewConversation: (conversations, action) => {
      conversations = conversations.map((c) => {
        if (c.id === -1) {
          return action.payload;
        } else {
          return c;
        }
      });
    },
    pushMessage: (conversations, action) => {
      conversations = conversations.map((conversation) => {
        if (
          conversation.active_users[0] === action.payload.from.user_id ||
          conversation.active_users[1] === action.payload.from.user_id
        ) {
          const newMessage = {
            ...action.payload,
            from: action.payload.from.user_id,
          };
          conversation.messages.unshift(newMessage);
        }
        return conversation;
      });
      // return conversations;
    },
  },
});

export const {
  setConversations,
  addConversation,
  setNewConversation,
  pushMessage,
  resetConversations,
} = conversationsSlice.actions;

export const getConversations = (state) => state.conversations;

export const getConversationByParams = (conversationId, userId) => {
  //console.log(conversationId, userId);
  if (conversationId) {
    return (state) => {
      const query = state.conversations.filter((c) => c.id === conversationId);
      return query.length > 0 ? query[0] : {messages: []};
    };
  } else if (userId) {
    return (state) => {
      const query = state.conversations.filter((c) =>
        c.active_users.reduce((r, au) => r || au === userId, false),
      );
      return query.length > 0 ? query[0] : {messages: []};
    };
  }
};

export default conversationsSlice.reducer;
