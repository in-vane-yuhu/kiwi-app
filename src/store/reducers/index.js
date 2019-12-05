import {combineReducers} from 'redux';
import user from './user';
import firm from './firm';

export default combineReducers({
  user: user,
  firm: firm,
});
