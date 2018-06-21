import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/master.css';
import thunk from 'redux-thunk';


//redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

import reducers from './reducers';

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>  ,
  document.getElementById('root')
);


