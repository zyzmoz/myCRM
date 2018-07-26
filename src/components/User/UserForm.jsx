import React, { Component } from 'react';
import { Panel, Row, Col, Button, FormGroup, FormControl, ControlLabel, Glyphicon, Checkbox } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getUser } from '../../actions/user';

const mapState = (state) => ({
  user: state.user.object
});

const actions = {
  getUser
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
      password1: '',
      password2: ''
    }

    if (id) {
      await getUser(id);
    }

    await this.setState({ ...this.state, user });
  }

  async componentWillReceiveProps(nextProps) {
    await this.setState({ ...this.state, user: { ...nextProps.user } });
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
      // await this.props.createCustomer(customer);
    } else {
      // await this.props.updateCustomer(customer);
    }
    this.props.history.goBack();
  }

  render() {
    const { submitting, pristine, user } = this.state;

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
                // validationState={this.getValidationState()}
                >
                  <Row>
                    <Col xs={12} md={8}>
                      <ControlLabel>Name</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.user.name}
                        placeholder="Nome"
                        onChange={e => this.handleChange('name', e.target.value)}
                      />
                    </Col>
                    <Col xs={6} md={4}>
                      <Checkbox  checked={user.manager === 'S'}>
                        Administrador
                      </Checkbox>
                    </Col>

                  </Row>
                </FormGroup>
                <Button type="button" onClick={() => this.props.history.goBack()}>
                  <Glyphicon glyph="arrow-left" />
                  Cancelar
                </Button>

                <Button type="submit" disabled={pristine || submitting} bsStyle="success" style={{ float: 'right' }}>
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