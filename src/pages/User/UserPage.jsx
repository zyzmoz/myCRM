import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import UserList from '../../components/User/UserList';
import { connect } from 'react-redux';


class UserPage extends Component {
  state = {
    search: ''
  }
  render() {
    const users = [{id: 1, name: 'Admin', phone:'', mobile: ''}];
    return (
      <div className="padding window">
        <h3>Usuários</h3>
        <form>
          <FormGroup>
            <ControlLabel>Buscar</ControlLabel>
            <FormControl
              type="text"
              value={this.state.search}
              placeholder="Digite um nome"              
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
        <br />
        <UserList users={users} openDelete={() => console.log()}/>

      </div>
    );
  }
}

export default UserPage;