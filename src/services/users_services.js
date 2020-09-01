import generic_service from './generic_service';

const url = 'users/';

export default {
  list: () => generic_service.doGet(url),
  me: () => generic_service.doGet(url + 'me/'),
};
