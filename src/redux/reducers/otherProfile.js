import {UPDATE_OTHER_USER} from '../actions/otherProfile';

const defaultState = {
  user: {},
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case UPDATE_OTHER_USER:
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
