import {anySatisfy} from '../../utils/utils';
import {
  FETCH_CONVERSATIONS_FULFILLED,
  FETCH_CONVERSATIONS_PENDING,
  PUSH_CONVERSATION,
  PUSH_MESSAGE,
  REPLACE_CONVERSATION,
} from '../actions/conversations';

const defaultState = {
  conversations: [],
  fetching: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case FETCH_CONVERSATIONS_FULFILLED:
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
    case PUSH_MESSAGE:
      return {
        ...state,
        conversations: state.conversations.map((conversation) => {
          if (conversation.id === action.payload.conversation.id) {
            const newMessage = {
              ...action.payload.newMessage,
              from: action.payload.newMessage.from.user_id,
            };
            conversation.messages.unshift(newMessage);
          }
          return conversation;
        }),
      };
    case PUSH_CONVERSATION:
      return {
        ...state,
        conversations: [...state.conversations, action.payload],
      };
    case REPLACE_CONVERSATION:
      return {
        ...state,
        conversations: state.conversations.map((c) => {
          if (
            c.id === -1 &&
            anySatisfy(c.active_users, action.payload.from.user_id) &&
            anySatisfy(c.active_users, action.payload.to.user_id)
          ) {
            return action.payload;
          } else {
            return c;
          }
        }),
      };
    default:
      return state;
  }
}

export const getConversations = (state) => state.conversations;

export const getConversationByParams = (conversationId, userId) => {
  // console.log(conversationId, userId);
  if (conversationId) {
    return (state) => {
      const query = state.conversations.conversations.filter(
        (c) => c.id === conversationId,
      );
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
