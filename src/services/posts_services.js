import generic_service from './generic_service';
import generic_service_normalized from './generic_service_normalized';

const url = 'posts/';

export default {
  list: (pageSize, offset) => generic_service_normalized.doGet(`${url}?limit=${pageSize}&offset=${offset}`),
  get: (id) => generic_service.doGet(`${url}${id}/`),
  edit: (id, newPost) => generic_service.doPut(`${url}${id}/`, newPost),
  create: (newPost) => generic_service.doPost(url, newPost),
  delete: (id) => generic_service.doDelete(`${url}${id}/`),
  getComments: (id) => generic_service.doGet(`${url}${id}/comments/`),

  //traer las reactions
  getReactions: (id) => generic_service.doGet(`${url}${id}/reactions/`),
  //agregar like
  addReaction: (id, like_value) => generic_service.doPost(`${url}${id}/reactions/`, {reaction_type: like_value}),
  deleteReaction:(id) => generic_service.doDelete(`${url}${id}/reactions/`),
};
