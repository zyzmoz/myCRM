import { combineReducers } from 'redux';
import customer from './customer';
import auth from './auth';
import user from './user';

const rootReducer = combineReducers({
  customer,
  auth,
  user
});

export default rootReducer;