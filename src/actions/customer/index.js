import {
  QUERY_CUSTOMERS
} from './constants';

export const queryCustomers = (str) => {
  return {
    type: QUERY_CUSTOMERS,
    payload: {
      data: {}
    }
  }
}