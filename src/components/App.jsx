import React, { Component } from 'react';
import HomePage from '../pages/Home/HomePage';
import Menu from './Menu/Menu';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () =>
  <Router >
    <div>
      <Menu />
      <Route exact path="/"
        component={() => <HomePage />}
      />    
    </div>
  </Router>

export default App;