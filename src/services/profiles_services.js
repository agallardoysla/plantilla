import generic_service from './generic_service';

const url = 'profiles/';

export default {
  list: () => generic_service.doGet(url),
  get: (id) => generic_service.doGet(`${url}${id}`),
  edit: (id, newProfile) => generic_service.doPut(`${url}${id}/`, newProfile),
};
