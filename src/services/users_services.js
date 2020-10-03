import generic_service from './generic_service';

const url = 'users/';

export default {
  list: () => generic_service.doGet(url),
  me: () => generic_service.doGet(url + 'me/'),
  getContext: (query) => generic_service.doPut(`${url}me/context/`, query),
  get: (userId) => generic_service.doGet(`${url}${userId}/`),
  edit: (userId, edition) => generic_service.doPut(`${url}${userId}/`, edition),
  listPosts: (userId) => generic_service.doGet(`${url}${userId}/posts/`),
  follow: (userId) => generic_service.doGet(`${url}${userId}/follow/`),
  unfollow: (userId) => generic_service.doDelete(`${url}${userId}/follow/`),
};
