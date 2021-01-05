import chats_services from '../../services/chats_services';

export const FETCH_CONVERSATIONS = 'FETCH_CONVERSATIONS';
export const FETCH_CONVERSATIONS_PENDING = 'FETCH_CONVERSATIONS_PENDING';
export const FETCH_CONVERSATIONS_FULFILLED = 'FETCH_CONVERSATIONS_FULFILLED';
export const FETCH_CONVERSATIONS_REJECTED = 'FETCH_CONVERSATIONS_REJECTED';

export const PUSH_MESSAGE = 'PUSH_MESSAGE';

export const PUSH_CONVERSATION = 'PUSH_CONVERSATION';
export const REPLACE_CONVERSATION = 'REPLACE_CONVERSATION';

//action creators

export function fetchConversations() {
  return {
    type: FETCH_CONVERSATIONS,
    payload: chats_services.list(),
  };
}

export function pushMessage(conversation, newMessage) {
  return {
    type: PUSH_MESSAGE,
    payload: {
      conversation,
      newMessage,
    },
  };
}

export function addConversation(newConversation) {
  return {
    type: PUSH_CONVERSATION,
    payload: newConversation,
  };
}

export function replaceConversation(newConversation) {
  return {
    type: REPLACE_CONVERSATION,
    payload: newConversation,
  };
}
