export const SAVE_ORDER = 'SAVE_ORDER';


import { ipcRenderer } from 'electron';

// export const queryUsers = (str) => {
//   ipcRenderer.send('users:query', '');
//   return async (dispatch) => {
//     await ipcRenderer.on('users:query:complete', (event, data) => {
//       if (str && (str !== ''))
//         data = data.filter(item => item.name.toUpperCase().includes(str.toUpperCase()));
//       dispatch({
//         type: QUERY_USERS,
//         payload: {
//           data:data
//         }
//       });
//     });
//   }
// }

export const saveOrder = (orderData) => {
  ipcRenderer.send('orders:save', orderData);
  return async(dispatch) => {
    await ipcRenderer.on('orders:save:complete', (event, data) => {
      if (!data) 
        console.log('Error');
    });   
  }
}