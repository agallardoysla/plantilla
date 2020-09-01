import generic_service from './generic_service';

const url = 'posts/';

export default {
  list: () => generic_service.doGet(url),
  get: (id) => generic_service.doGet(`${url}${id}/`),
  edit: (id, newPost) => generic_service.doPut(`${url}${id}/`, newPost),
  create: (newPost) => generic_service.doPost(url, newPost),
  delete: (id) => generic_service.doDelete(`${url}${id}/`),
  getComments: (id) => generic_service.doGet(`${url}${id}/comments/`),
  getReactions: (id) => generic_service.doGet(`${url}${id}/reactions/`),
};
