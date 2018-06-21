import {
  QUERY_CUSTOMERS,
  GET_CUSTOMER
} from './constants';
import { ipcRenderer } from 'electron';

export const queryCustomers = (str) => {
  ipcRenderer.send('customers:query', '');
  return async (dispatch) => {
    await ipcRenderer.on('customers:query:complete', (event, data) => {
      if (str && (str !== ''))
        data = data.filter(item => item.name.toUpperCase().includes(str.toUpperCase()));
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
  console.log('data sent');
  return async (dispatch) => {
    await ipcRenderer.on('customers:get:complete', (event, data) => {      
      dispatch({
        type: GET_CUSTOMER,
        payload: {
          data: data[0]
        }
      });
    });
  }
}