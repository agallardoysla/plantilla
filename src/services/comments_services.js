import generic_service from './generic_service';

const url = 'comments/';

export default {
  list: () => generic_service.doGet(url),
  get: (id) => generic_service.doGet(`${url}${id}/`),
  edit: (id, newPost) => generic_service.doPut(`${url}${id}/`, newPost),
  create: (data) => generic_service.doPost(url, data),
  delete: (id) => generic_service.doDelete(`${url}${id}/`),
};
