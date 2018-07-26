import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import UserList from '../../components/User/UserList';
import { connect } from 'react-redux';
import { queryUsers, startDeleteUser, cancelDeleteUser, deleteUser } from '../../actions/user';
import UserDeleteForm from '../../components/User/UserDeleteForm';

const mapState = (state) => ({
  users: state.user.list,
  user: state.user.object,
  auth: state.auth
});

const actions = {
  queryUsers,
  startDeleteUser,
  cancelDeleteUser,
  deleteUser
};

class UserPage extends Component {
  state = {
    str: ''
  }

  componentWillMount() {
    this.props.queryUsers();
  }

  queryUsers = async (str) => {
    await this.setState({ str: str });
    await this.props.queryUsers(this.state.str);
  }

  handleOpenDelete = async (user) => {
    await this.props.startDeleteUser(user);
    console.log(this.props);
  }

  handleCancelDelete = async (user) => {
    await this.props.cancelDeleteUser(user);
  }

  handleDelete = async (id) => {
    await this.props.deleteUser(id);
    console.log(this.props);
  }

  render() {
    const { users, user } = this.props;
    const currentUser = this.props.auth.id;
    console.log(this.props);
    return (
      <div className="padding window">
        {user && user.deleting &&
          <UserDeleteForm user={user} handleDelete={this.handleDelete} handleCancel={this.handleCancelDelete} />
        }
        <h3>Usuários</h3>

        <form>
          <FormGroup>
            <ControlLabel>Buscar</ControlLabel>
            <FormControl
              type="text"
              value={this.state.search}
              placeholder="Digite um nome"
              onChange={e => this.queryUsers(e.target.value)}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
        <br />
        <LinkContainer to="/createUser">
          <Button bsStyle="success">
            <Glyphicon glyph="star" />
            Novo
          </Button>
        </LinkContainer>
        <br />
        <UserList users={users} currentUser={currentUser} openDelete={this.handleOpenDelete} />

      </div>
    );
  }
}

export default connect(mapState, actions)(UserPage);