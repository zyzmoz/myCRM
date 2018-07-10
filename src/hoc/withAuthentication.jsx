import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginPage from '../pages/Login/LoginPage';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {    
    render() {           
      return (
        <div>
        {
        this.props.auth.authenticated?<Component />:<LoginPage />
      }
      </div>
    );
    }
  }

  const mapState = ( state ) => ({
    auth: state.auth
  });
  return connect(mapState)(WithAuthentication);
};

export default withAuthentication;