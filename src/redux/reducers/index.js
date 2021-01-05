import {combineReducers} from 'redux';
import session from './session';
import feed from './feed';
import postDetails from './postDetails';
import otherProfile from './otherProfile';
import conversations from './conversations';
import prueba from './prueba';

export default combineReducers({
  session,
  feed,
  prueba,
  postDetails,
  otherProfile,
  conversations,
});
