import users_services from '../../services/users_services';

export const GET_OTHER_USER = 'GET_OTHER_USER';
export const GET_OTHER_USER_PENDING = 'GET_OTHER_USER_PENDING';
export const GET_OTHER_USER_FULFILLED = 'GET_OTHER_USER_FULFILLED';
export const GET_OTHER_USER_REJECTED = 'GET_OTHER_USER_REJECTED';

export function getOtherUser(id) {
  return {
    type: GET_OTHER_USER,
    payload: users_services.get(id),
  };
}
