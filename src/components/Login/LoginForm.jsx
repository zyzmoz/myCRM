import React, { Component } from 'react';
import { Panel, FormGroup, ControlLabel, FormControl, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { doLogin } from '../../actions/auth';

const mapState = (state) => ({
  auth: state.auth
});

const actions = {
  doLogin
}


class LoginForm extends Component {

  state = {
    auth: {
      user: '',
      password: ''
    },
    pristine: true
  }

  async handleChange(field, value) {
    const obj = this.state.auth;
    obj[field] = value;
    await this.setState({ ...this.state, auth: obj, pristine: false });
  }

  async doLogin() {
    const { user, password } = this.state.auth;
    await this.props.doLogin(user, password);
  }

  render() {
    const { user, password } = this.state.auth;
    const { pristine } = this.state;
    const { error } = this.props.auth;
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>Login</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <form >
            <FormGroup
              controlId="formBasicText"

            >

              <ControlLabel>Usuário</ControlLabel>
              <FormControl
                type="text"
                value={user}
                placeholder="Usuário"
                onChange={e => this.handleChange('user', e.target.value)}
              />

              <ControlLabel>Senha</ControlLabel>
              <FormControl
                type="password"
                value={password}
                placeholder="Senha"
                onChange={e => this.handleChange('password', e.target.value)}
              />
            </FormGroup>
            {error && <Alert bsStyle="danger">
              <strong>Não foi possível entrar no sistema</strong>
              <p>Verifique o Usuário e/ou a Senha</p>
            </Alert>}
            <Button disabled={pristine} block bsStyle="success" onClick={() => this.doLogin()}>Entrar</Button>
          </form>
        </Panel.Body>
      </Panel>
    );
  }
}

export default connect(mapState, actions)(LoginForm);