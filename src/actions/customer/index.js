import {
  QUERY_CUSTOMERS
} from './constants';
import { ipcRenderer } from 'electron';

export const queryCustomers = (str) => {
  ipcRenderer.send('customers:query', '');
  return async (dispatch) => {
    ipcRenderer.on('customers:query:complete', (event, data) => {
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