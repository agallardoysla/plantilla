import chats_services from '../../services/chats_services';

export const FETCH_CONVERSATIONS = 'FETCH_CONVERSATIONS';
export const FETCH_CONVERSATIONS_PENDING = 'FETCH_CONVERSATIONS_PENDING';
export const FETCH_CONVERSATIONS_FULFILLED = 'FETCH_CONVERSATIONS_FULFILLED';
export const FETCH_CONVERSATIONS_REJECTED = 'FETCH_CONVERSATIONS_REJECTED';

export const PUSH_MESSAGE = 'PUSH_MESSAGE';

//action creators

export function fetchConversations() {
  return {
    type: FETCH_CONVERSATIONS,
    payload: chats_services.list()
  };
}

export function pushMessage(newMessage) {
  return {
    type: PUSH_MESSAGE,
    payload: newMessage,
  };
}

export function setNewConversation(newConversation) {
  return {
    type: PUSH_MESSAGE,
    payload: newMessage,
  };
}