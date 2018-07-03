import React, { Component } from 'react';
import HomePage from '../pages/Home/HomePage';
import CustomerPage from '../pages/Customer/CustomerPage';
import CustomerDetailedPage from '../pages/Customer/CustomerDetailedPage';
import CustomerForm from './Customer/CustomerForm';
import Menu from './Menu/Menu';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

// library.add(faStroopwafel)

const App = () =>
  <Router className="content">
    <Row >
      <Col md={2} xs={1}>
      <Menu className="col col-3" />
      </Col>
      <Col md={10} xs={15}>
      <Switch className="col col-9">
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
      </Col>


    </Row>
  </Router>

export default App;