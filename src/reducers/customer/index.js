import {
  QUERY_CUSTOMERS, 
  GET_CUSTOMER
} from '../../actions/customer/constants';

import { createReducer } from '../../util/createReducer';


let initialState = {};

const queryCustomers = (state, payload) => {  
  return {
    list: payload.data
  }
}

const getCustomer = (state, payload) => {  
  return {
    ...state,
    object: payload.data
  }
}

export default createReducer(initialState, {
  [QUERY_CUSTOMERS]: queryCustomers,
  [GET_CUSTOMER]: getCustomer
});