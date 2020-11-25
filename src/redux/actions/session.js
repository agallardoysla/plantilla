import generic_service from "../../services/generic_service";

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_PENDING = 'LOGIN_USER_PENDING';
export const LOGIN_USER_FULFILLED = 'LOGIN_USER_FULFILLED';
export const LOADING = 'LOADING';

const url = 'users/';

//action creators

export function login() {
  return {
    type: LOGIN_USER,
    payload: generic_service.doGet(url + 'me/', true),
  };
}
