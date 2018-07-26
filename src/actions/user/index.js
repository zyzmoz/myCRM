import { QUERY_USERS, GET_USER, START_DELETE_USER, CANCEL_DELETE_USER } from './constants';

import { ipcRenderer } from 'electron';

export const queryUsers = (str) => {
  ipcRenderer.send('users:query', '');
  return async (dispatch) => {
    await ipcRenderer.on('users:query:complete', (event, data) => {
      if (str && (str !== ''))
        data = data.filter(item => item.name.toUpperCase().includes(str.toUpperCase()));
      dispatch({
        type: QUERY_USERS,
        payload: {
          data:data
        }
      });
    });
  }
}

export const getUser = (id) => {
  ipcRenderer.send('users:get', id);
  return async (dispatch) => {
    await ipcRenderer.on('users:get:complete', (event, data) => {
      dispatch({
        type: GET_USER,
        payload: {
          data: data
        }
      });
    });
  }
}

export const startDeleteUser = (user) => {
  return {
    type: START_DELETE_USER,
    payload: {
      data: user
    }
  }
}

export const cancelDeleteUser = (user) => {
  return {
    type: CANCEL_DELETE_USER,
    payload: {
      data: user
    }
  }
}

export const deleteUser = (id) => {
  ipcRenderer.send('users:delete', id);
  return async (dispatch) => {
    await ipcRenderer.on('users:delete:complete', (event, data) => {
    });
    queryUsers();
  }
}