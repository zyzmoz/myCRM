import {
  QUERY_CUSTOMERS
} from '../../actions/customer/constants';

import { createReducer } from '../../util/createReducer';
import { ipcRenderer } from 'electron';

let initialState = [];
ipcRenderer.send('customers:query', '');
  ipcRenderer.on('customers:query:complete', (event, data) => {
    initialState = data;
});

const queryCustomers = (state, payload) => {
  return [
    ...state, payload.data
  ]
}

export default createReducer(initialState, {
  [QUERY_CUSTOMERS]: queryCustomers
});