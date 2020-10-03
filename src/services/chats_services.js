import generic_service from './generic_service';

const url = 'users/me/chat/';

export default {
  list: () => generic_service.doGet(url),
  get: (chatId) => generic_service.doGet(`${url}${chatId}/`),
  delete: (chatId) => generic_service.doDelete(`${url}${chatId}/`),
  deleteMessage: (messageId) => generic_service.doDelete(`${url}message/${messageId}/`),
  sendMessage: (userId, message) => generic_service.doPost(`/users/${userId}/message/`, message),
};
