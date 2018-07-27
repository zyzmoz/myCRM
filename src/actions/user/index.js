import { QUERY_USERS, GET_USER, START_DELETE_USER, CANCEL_DELETE_USER, CREATE_USER, UPDATE_USER } from './constants';

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

export const createUser = (user) => {
  const newUser = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    mobile: user.mobile,
    user: user.user,
    password: user.password1,
    manager: user.manager
  }

  ipcRenderer.send('users:create', newUser);  
  return async (dispatch) => {
    await ipcRenderer.on('users:create:complete', (event, data) => {      
      dispatch({
        type: CREATE_USER
      });
    });
  }
}

export const updateUser = (user) => {
  const updUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    mobile: user.mobile,
    user: user.user,
    password: user.password,
    password1: user.password1,
    manager: user.manager
  }

  ipcRenderer.send('users:update', updUser);  
  return async (dispatch) => {
    await ipcRenderer.on('users:update:complete', (event, data) => {      
      dispatch({
        type: UPDATE_USER
      });
    });
  }
}