import generic_service from './generic_service';

const url = 'files/';

export default {
  list: () => generic_service.doGet(url, true),
  get: (id) => generic_service.doGet(`${url}${id}/`, true),
  create: (newFile) => generic_service.doPost(url, newFile, true),
};
