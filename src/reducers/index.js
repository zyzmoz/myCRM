import { combineReducers } from 'redux';
import customer from './customer';
import auth from './auth';

const rootReducer = combineReducers({
  customer,
  auth
});

export default rootReducer;