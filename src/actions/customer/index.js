import {
  QUERY_CUSTOMERS,
  GET_CUSTOMER,
  CREATE_CUSTOMER,
  UPDATE_COSTUMER,
  START_DELETE_COSTUMER
} from './constants';
import { ipcRenderer } from 'electron';

export const queryCustomers = (str) => {
  ipcRenderer.send('customers:query', str);
  return async (dispatch) => {
    await ipcRenderer.on('customers:query:complete', (event, data) => {
      // if (str && (str !== ''))
      //   data = data.filter(item => item.name.toUpperCase().includes(str.toUpperCase()));
      dispatch({
        type: QUERY_CUSTOMERS,
        payload: {
          data: data
        }
      });
    });
  }
}

export const getCustomer = (id) => {
  ipcRenderer.send('customers:get', id);
  return async (dispatch) => {
    await ipcRenderer.on('customers:get:complete', (event, data) => {    
      dispatch({
        type: GET_CUSTOMER,
        payload: {
          data: data
        }
      });
    });
  }
}

export const createCustomer = (customer) => {
  ipcRenderer.send('customers:create', customer);  
  return async (dispatch) => {
    await ipcRenderer.on('customers:create:complete', (event, data) => {      
      dispatch({
        type: CREATE_CUSTOMER        
      });
    });
  }
}

export const updateCustomer = (customer) => {
  ipcRenderer.send('customers:update', customer);
  return async (dispatch) => {
    await ipcRenderer.on('customers:update:complete', (event, data) => {
      dispatch({
        type: UPDATE_COSTUMER
      });
    });
  }
}

export const startDeleteCustomer = (customer) => {
  return {
    type: START_DELETE_COSTUMER,
    payload: {
      data: customer
    }
  }
}

export const deleteCustomer = (id) => {
  ipcRenderer.send('customers:delete', id);
  return async (dispatch) => {
    await ipcRenderer.on('customers:delete:complete', (event, data) => {
    });
    queryCustomers();
  }
}