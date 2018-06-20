import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/master.css';
import { ipcRenderer } from 'electron';

//redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

const createStoreWithMiddleware = applyMiddleware()(createStore);

import reducers from './reducers';

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>  ,
  document.getElementById('root')
);
