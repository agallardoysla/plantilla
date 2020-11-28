import {
  FETCH_CONVERSATIONS_FULFILLED, FETCH_CONVERSATIONS_PENDING,
} from '../actions/conversations';

const defaultState = {
  conversations: [],
  fetching: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case FETCH_CONVERSATIONS_FULFILLED:
      console.log('nuevas conversaciones:', action.payload.data);
      return {
        ...state,
        conversations: action.payload.data,
        fetching: false,
      };
    case FETCH_CONVERSATIONS_PENDING:
      return {
        ...state,
        fetching: true,
      };
    default:
      return state;
  }
}

export const getConversations = (state) => state.conversations;

export const getConversationByParams = (conversationId, userId) => {
  console.log(conversationId, userId);
  if (conversationId) {
    return (state) => {
      const query = state.conversations.conversations.filter((c) => c.id === conversationId);
      return query.length > 0 ? query[0] : {messages: []};
    };
  } else if (userId) {
    return (state) => {
      const query = state.conversations.conversations.filter((c) =>
        c.active_users.reduce((r, au) => r || au === userId, false),
      );
      return query.length > 0 ? query[0] : {messages: []};
    };
  }
};