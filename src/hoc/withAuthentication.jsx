import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginPage from '../pages/Login/LoginPage';
import { doLogout } from '../actions/auth';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {    
    render() {           
      return (
        <div>
        {
        this.props.auth.authenticated?<Component auth={this.props.auth} doLogout={this.props.doLogout} />:<LoginPage />
      }
      </div>
    );
    }
  }

  const mapState = ( state ) => ({
    auth: state.auth
  });

  const actions = {
    doLogout
  }
  return connect(mapState, actions)(WithAuthentication);
};

export default withAuthentication;