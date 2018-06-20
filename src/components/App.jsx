import React, { Component } from 'react';
import HomePage from '../pages/Home/HomePage';
import CustomerPage from '../pages/Customer/CustomerPage';
import Menu from './Menu/Menu';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () =>
  <Router >
    <div>
      <Menu />

      <Route exact path="/"
        component={HomePage}
      />    
      <Route exact path="/customer"
        component={CustomerPage }
      />    

     
    </div>
  </Router>

export default App;