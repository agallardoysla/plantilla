import generic_service from './generic_service';

const url = 'users/';

export default {
  list: () => generic_service.doGet(url),
  me: () => generic_service.doGet(url + 'me/'),
  get: (userId) => generic_service.doGet(`${url}${userId}/`),
  listPosts: (userId) => generic_service.doGet(`${url}${userId}/posts/`),
  follow: (userId) => generic_service.doGet(`${url}${userId}/follow/`),
  unfollow: (userId) => generic_service.doDelete(`${url}${userId}/follow/`),
};
