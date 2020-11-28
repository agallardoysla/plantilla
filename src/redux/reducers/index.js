import {combineReducers} from 'redux';
import session from './session';
import feed from './feed';
import postDetails from './postDetails';

export default combineReducers({session, feed, postDetails});