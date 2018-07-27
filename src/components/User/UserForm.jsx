import React, { Component } from 'react';
import { Panel, Row, Col, Button, FormGroup, FormControl, ControlLabel, Glyphicon, Checkbox, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getUser, updateUser, createUser } from '../../actions/user';

const mapState = (state) => ({
  user: state.user.object
});

const actions = {
  getUser,
  updateUser,
  createUser
}

class UserForm extends Component {

  state = {
    pristine: true,
    submitting: false
  }

  async componentWillMount() {
    const { id } = this.props.match.params;
    const { getUser } = this.props;

    let user = {
      name: '',
      user: '',
      phone: '',
      mobile: '',
      email: '',
      manager: 'N',
      password: null,
      password1: '',
      password2: ''
    }

    if (id) {
      await getUser(id);
      user = { ...user, ...this.props.user };
    }

    await this.setState({ ...this.state, user });
  }

  async componentWillReceiveProps(nextProps) {
    await this.setState({ ...this.state, user: { ...this.state.user, ...nextProps.user } });
  }

  async handleChange(field, value) {
    const obj = this.state.user;
    obj[field] = value;
    await this.setState({ ...this.state, user: obj, pristine: false });
  }

  async handleSubmit(event) {
    this.setState({ ...this.state, submitting: true });
    event.preventDefault();
    const { user } = this.state;

    if (!user.id) {
      await this.props.createUser(user);
    } else {
      await this.props.updateUser(user);
    }
    this.props.history.goBack();
  }

  async handleCheckbox() {
    const obj = this.state.user;
    if (obj['manager'] === 'S') {
      obj['manager'] = 'N';
    } else {
      obj['manager'] = 'S';
    }
    await this.setState({ ...this.state, user: obj, pristine: false });
  }

  render() {
    const { submitting, pristine, user } = this.state;
    const isValidPassword = user ?
      ((user.password && user.password1 === '' && user.password2 === '') ||
        (user.password && user.password1 === user.password2) ||
        (!user.password && (user.password1 === user.password2) &&
          (user.password1 !== '' && user.password2 !== ''))) : true;


    return (
      <div className="padding window">
        {user &&
          <Panel>
            <Panel.Heading>
              <Panel.Title>Cadastro de Usuários</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <FormGroup
                  controlId="formBasicText"
                >
                  <Row>
                    <Col xs={6} md={4}>
                      <ControlLabel>Name</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.user.name}
                        placeholder="Nome"
                        onChange={e => this.handleChange('name', e.target.value)}
                      />
                    </Col>
                    <Col xs={6} md={4}>
                      <ControlLabel>Usuário</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.user.user}
                        placeholder="Usuário"
                        onChange={e => this.handleChange('user', e.target.value)}
                      />
                    </Col>
                    <Col xs={6} md={4}>
                      <ControlLabel></ControlLabel>
                      <Checkbox onClick={() => this.handleCheckbox()} checked={user.manager === 'S'} >
                        Administrador
                      </Checkbox>
                    </Col>
                  </Row>

                </FormGroup>
                <FormGroup
                  controlId="formBasicText"
                >
                  <Row>
                    <Col xs={6} md={4}>
                      <ControlLabel>Telefone</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.user.phone}
                        placeholder="Telefone"
                        onChange={e => this.handleChange('phone', e.target.value)}
                      />
                    </Col>
                    <Col xs={6} md={4}>
                      <ControlLabel>Celular</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.user.mobile}
                        placeholder="Celular"
                        onChange={e => this.handleChange('mobile', e.target.value)}
                      />
                    </Col>
                    <Col xs={6} md={4}>
                      <ControlLabel>Email</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.user.email}
                        placeholder="Email"
                        onChange={e => this.handleChange('email', e.target.value)}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup
                  controlId="formBasicText"
                >
                  <Row>
                    <Col xs={8} md={6}>
                      <ControlLabel>Senha</ControlLabel>
                      <FormControl
                        type="password"
                        value={this.state.user.password1}
                        placeholder="Senha"
                        onChange={e => this.handleChange('password1', e.target.value)}
                      />
                    </Col>
                    <Col xs={8} md={6}>
                      <ControlLabel>Confirmação da Senha</ControlLabel>
                      <FormControl
                        type="password"
                        value={this.state.user.password2}
                        placeholder="Confirmação da Senha"
                        onChange={e => this.handleChange('password2', e.target.value)}
                      />
                    </Col>
                  </Row>
                  <hr/>
                  <Row>
                    <Col xs={16} md={12}>
                      {!isValidPassword &&
                        <Alert bsStyle="danger">
                          <strong>Erro</strong>
                          <p>Verifique se as senhas informadas são iguais!</p>
                        </Alert>
                      }
                    </Col>
                  </Row>
                </FormGroup>
                <Button type="button" onClick={() => this.props.history.goBack()}>
                  <Glyphicon glyph="arrow-left" />
                  Cancelar
                </Button>

                <Button type="submit" disabled={pristine || submitting || !isValidPassword} bsStyle="success" style={{ float: 'right' }}>
                  <Glyphicon glyph="save" />
                  {submitting ? 'Salvando...' : 'Salvar'}
                </Button>
              </form>
            </Panel.Body>
          </Panel>
        }

      </div>
    );
  }
}

export default connect(mapState, actions)(UserForm);