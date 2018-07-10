import React, { Component } from 'react';
import { Panel, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';


class LoginForm extends Component {
  render() {
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
                value=""
                placeholder="Usuário"
              />

              <ControlLabel>Senha</ControlLabel>
              <FormControl
                type="password"
                value=""
                placeholder="Senha"
              />
            </FormGroup>
            <Button block bsStyle="success">Entrar</Button>
          </form>
        </Panel.Body>
      </Panel>
    );
  }
}

export default LoginForm;