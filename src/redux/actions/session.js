import generic_service from "../../services/generic_service";

export const RECOVER_SESSION = 'RECOVER_SESSION';
export const RECOVER_SESSION_PENDING = 'RECOVER_SESSION_PENDING';
export const RECOVER_SESSION_FULFILLED = 'RECOVER_SESSION_FULFILLED';
export const LOADING = 'LOADING';

const url = 'users/';

//action creators

export function recoverSession() {
  return {
    type: RECOVER_SESSION,
    payload: generic_service.doGet(url + 'me/', true),
  };
}
