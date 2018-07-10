import {
  LOGIN,
  LOGOUT
} from './constants';
import { ipcRenderer } from 'electron';


export const doLogin = (usr, pwd) => {
  return async (dispatch) => {
    await ipcRenderer.send('auth:login', {usr, pwd});
    await ipcRenderer.on('auth:login:complete', (event, data) => {
      console.log(data);      
      dispatch({
        type: LOGIN,
        payload: {
          auth: {...data}
        }
      })
    });    
    
  }
}