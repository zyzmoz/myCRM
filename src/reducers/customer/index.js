import {
  QUERY_CUSTOMERS, 
  GET_CUSTOMER,
  CREATE_CUSTOMER,
  UPDATE_COSTUMER,
  START_DELETE_COSTUMER
} from '../../actions/customer/constants';

import { createReducer } from '../../util/createReducer';


let initialState = {};

const queryCustomers = (state, payload) => {  
  return {
    list: payload.data
  }
}

const getCustomer = (state, payload) => {  
  console.log('payload', payload);
  return {
    ...state,
    object: payload.data
  }
}

const createCustomer = (state, payload) => {  
  return {
    ...state
  }
}
const updateCustomer = (state, payload) => {
  return {
    ...state
  }
}

const startDeleteCustomer = (state, payload) =>  {
  return {
    ...state,
    object: payload.data    
  }
}

export default createReducer(initialState, {
  [QUERY_CUSTOMERS]: queryCustomers,
  [GET_CUSTOMER]: getCustomer,
  [CREATE_CUSTOMER]: createCustomer,
  [UPDATE_COSTUMER]: updateCustomer,
  [START_DELETE_COSTUMER]: startDeleteCustomer
});