import React, { Component } from 'react';
import HomePage from '../pages/Home/HomePage';
import CustomerPage from '../pages/Customer/CustomerPage';
import Menu from './Menu/Menu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () =>
  <Router >
    <div>
      <Menu />
      <Switch>
        <Route exact path="/"
          component={HomePage}
        />
        <Route exact path="/customer"
          component={CustomerPage}
        />

        <Route path="*"
          component={HomePage}
        />
      </Switch>


    </div>
  </Router>

export default App;