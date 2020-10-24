import {LOGIN, LOGOUT} from '../actions';

const initialState = {};

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return action.userData;

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}
