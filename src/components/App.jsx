import React, { Component } from 'react';
import HomePage from '../pages/Home/HomePage';
import CustomerPage from '../pages/Customer/CustomerPage';
import CustomerDetailedPage from '../pages/Customer/CustomerDetailedPage';
import CustomerForm from './Customer/CustomerForm';
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

        <Route exact path="/customer/:id"
          component={CustomerDetailedPage}
        />

        <Route exact path="/customerManage/:id"
          component={CustomerForm}
        />

        <Route exact path="/createCustomer"
          component={CustomerForm}
        />

        <Route path="*"
          component={HomePage}
        />
      </Switch>


    </div>
  </Router>

export default App;