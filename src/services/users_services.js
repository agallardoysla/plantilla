import generic_service from './generic_service';

const url = 'users/';

const me = () => {
  const dunno = generic_service.doGet(url + 'me/', true);
  return dunno
}
export default {
  list: () => generic_service.doGet(url),
  me,
  getAccounts: () => generic_service.doGet(`${url}me/accounts/`),
  getContext: (query) => generic_service.doPut(`${url}me/context/`, query),
  getNotifications: () => generic_service.doGet(`${url}me/notifications/`),
  get: (userId) => generic_service.doGet(`${url}${userId}/`),
  edit: (userId, edition) => generic_service.doPut(`${url}${userId}/`, edition, true),
  listPosts: (userId) => generic_service.doGet(`${url}${userId}/posts/`),
  follow: (userId) => generic_service.doGet(`${url}${userId}/follow/`),
  cancelFollow: (userId) => generic_service.doDelete(`${url}${userId}/follow/`),
  acceptFollower: (requestId) => generic_service.doPut(`${url}me/followrequests/${requestId}/`),
  denyFollower: (requestId) => generic_service.doDelete(`${url}me/followrequests/${requestId}/`),
  removeFollower: (userId) => generic_service.doDelete(`${url}me/followers/${userId}/`),
  reportUser: (userId, cause) => generic_service.doPost(`${url}${userId}/report/`, cause),
  cancelReportUser: (userId) => generic_service.doDelete(`${url}${userId}/report/`),
  blockUser: (userId) => generic_service.doGet(`${url}${userId}/block/`),
  cancelBlockUser: (userId) => generic_service.doDelete(`${url}${userId}/block/`),
  followerVip: (userId) => generic_service.doGet(`${url}${userId}/vip/`),
  removeFollowerVip: (userId) => generic_service.doDelete(`${url}${userId}/vip/`),
};
