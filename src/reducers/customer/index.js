import {
  QUERY_CUSTOMERS
} from '../../actions/customer/constants';

import { createReducer } from '../../util/createReducer';


let initialState = {};

const queryCustomers = (state, payload) => {  
  return {
    data: payload.data
  }
}

export default createReducer(initialState, {
  [QUERY_CUSTOMERS]: queryCustomers
});