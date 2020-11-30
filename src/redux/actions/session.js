import generic_service from "../../services/generic_service";
import auth from '@react-native-firebase/auth';
import session from "../../utils/session";

export const RECOVER_SESSION = 'RECOVER_SESSION';
export const RECOVER_SESSION_PENDING = 'RECOVER_SESSION_PENDING';
export const RECOVER_SESSION_FULFILLED = 'RECOVER_SESSION_FULFILLED';
export const RECOVER_SESSION_REJECTED = 'RECOVER_SESSION_REJECTED';

export const LOGIN = 'LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';

export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_PENDING = 'GET_TOKEN_PENDING';
export const GET_TOKEN_FULFILLED = 'GET_TOKEN_FULFILLED';
export const GET_TOKEN_REJECTED = 'GET_TOKEN_REJECTED';

export const GET_SESSION_ACTIVE = 'GET_SESSION_ACTIVE';

export const LOADING = 'LOADING';

const url = 'users/';

//action creators

export function recoverSession() {
  return {
    type: RECOVER_SESSION,
    payload: generic_service.doGet(url + 'me/', true),
  };
}

export function checkSessionActive() {
  return {
    type: GET_SESSION_ACTIVE,
    payload: auth()?.currentUser !== null,
  };
}

export function loginEmail(email, password) {
  return {
    type: LOGIN,
    payload: session.loginEmail(email, password),
  };
}

export function loginGoogle() {
  return {
    type: LOGIN,
    payload: session.loginGoogle(),
  };
}

export function loginFacebook() {
  return {
    type: LOGIN,
    payload: session.loginEmail(),
  };
}



