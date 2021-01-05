import {combineReducers} from 'redux';
import session from './session';
import feed from './feed';
import postDetails from './postDetails';
import otherProfile from './otherProfile';
import conversations from './conversations';
import prueba, {setPrueba} from './prueba';

export const actions = {
  setPrueba,
};

export default combineReducers({
  session,
  feed,
  prueba,
  postDetails,
  otherProfile,
  conversations,
});
