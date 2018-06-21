import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCustomer, createCustomer, updateCustomer } from '../../actions/customer';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Panel, Button, Glyphicon, Row, Col } from 'react-bootstrap';

import format from 'date-fns/format';

const mapState = (state) => ({
  customer: state.customer.object,
  initialValues: state.customer.object
});

const actions = {
  getCustomer,
  createCustomer,
  updateCustomer
}

class CustomerForm extends Component {
  state = {
    pristine: true,
    submitting: false
  }

  async handleSubmit(event) {
    this.setState({ ...this.state, submitting: true });
    event.preventDefault();
    const { customer } = this.state;
    customer.birthdate = format(customer.birthdate || new Date(), 'YYYY-MM-DD');
    if (!customer.id) {
      await this.props.createCustomer(customer);
    } else {
      await this.props.updateCustomer(customer);
    }
    this.props.history.goBack();
  }

  async handleChange(field, value) {
    console.log(field, value);

    const obj = this.state.customer;
    obj[field] = value;
    await this.setState({ ...this.state, customer: obj, pristine: false });
  }

  async componentWillMount() {
    const { id } = this.props.match.params;
    const { getCustomer } = this.props;

    if (id) {
      await getCustomer(id);
      const { customer } = this.props;
      console.log('Fetching customer', customer);      
    } else {
      const customer = {
        id: null,
        name: '',
        doc_id: '',
        cpf_cnpj: '',
        birthdate: '',
        address: '',
        neighborhood: '',
        city: '',
        state: '',
        phone: '',
        mobile: '',
        email: '',
        fidelity: '',
        obs: ''
      }

      await this.setState({ ...this.state, customer });
    }
  }

  async componentWillReceiveProps(nextProps){
    console.log('next', nextProps);
    await this.setState({ ...this.state, customer: nextProps.customer });
  }



  render() {

    const { submitting, pristine, customer } = this.state;
    console.log('Props',this.props);
    console.log('Props',this.props);

    return (
      <div className="container">
        {customer &&
          <Panel>
            <Panel.Heading>
              <Panel.Title>Cadastro de Clientes</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <FormGroup
                  controlId="formBasicText"
                // validationState={this.getValidationState()}
                >
                  <Row>
                    <Col xs={18} md={12}>
                      <ControlLabel>Name</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.customer.name}
                        placeholder="Nome"
                        onChange={e => this.handleChange('name', e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6} md={4}>
                      <ControlLabel>RG/IE</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.customer.doc_id}
                        placeholder="RG"
                        onChange={e => this.handleChange('doc_id', e.target.value)}
                      />
                    </Col>
                    <Col xs={6} md={4}>
                      <ControlLabel>CPF/CNPJ</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.customer.cpf_cnpj}
                        placeholder="CPF/CNPJ"
                        onChange={e => this.handleChange('cpf_cnpj', e.target.value)}
                      />
                    </Col>
                    <Col xs={6} md={4}>
                      <ControlLabel>Data de Nascimento</ControlLabel>
                      <FormControl
                        type="date"
                        value={this.state.customer.birthdate}
                        placeholder="Data de Nascimento"
                        onChange={e => this.handleChange('birthdate', e.target.value)}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={18} md={12}>
                      <ControlLabel>Endereço</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.customer.address}
                        placeholder="Endereço"
                        onChange={e => this.handleChange('address', e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6} md={4}>
                      <ControlLabel>Bairro</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.customer.neighborhood}
                        placeholder="Bairro"
                        onChange={e => this.handleChange('neighborhood', e.target.value)}
                      />
                    </Col>
                    <Col xs={6} md={4}>
                      <ControlLabel>Cidade</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.customer.city}
                        placeholder="Cidade"
                        onChange={e => this.handleChange('city', e.target.value)}
                      />
                    </Col>
                    <Col xs={6} md={4}>
                      <ControlLabel>UF</ControlLabel>
                      <FormControl
                        type="text"
                        maxLength={2}
                        value={this.state.customer.state}
                        placeholder="UF"
                        onChange={e => this.handleChange('state', e.target.value)}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={6} md={4}>
                      <ControlLabel>Telefone</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.customer.phone}
                        placeholder="Telefone"
                        onChange={e => this.handleChange('phone', e.target.value)}
                      />
                    </Col>
                    <Col xs={6} md={4}>
                      <ControlLabel>Celular</ControlLabel>
                      <FormControl
                        type="text"

                        value={this.state.customer.mobile}
                        placeholder="Celular"
                        onChange={e => this.handleChange('mobile', e.target.value)}
                      />
                    </Col>
                    <Col xs={6} md={4}>
                      <ControlLabel>Email</ControlLabel>
                      <FormControl
                        type="text"

                        value={this.state.customer.email}
                        placeholder="Email"
                        onChange={e => this.handleChange('email', e.target.value)}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={8} md={6}>
                      <ControlLabel>Programa de Fidelidade</ControlLabel>
                      <FormControl
                        type="text"
                        componentClass="textarea"
                        value={this.state.customer.fidelity}
                        placeholder="Programa de Fidelidade"
                        onChange={e => this.handleChange('fidelity', e.target.value)}
                      />

                    </Col>
                    <Col xs={8} md={6}>
                      <ControlLabel>Observações</ControlLabel>
                      <FormControl
                        type="text"
                        componentClass="textarea"
                        value={this.state.customer.obs}
                        placeholder="Observações"
                        onChange={e => this.handleChange('obs', e.target.value)}
                      />
                    </Col>
                  </Row>


                  <FormControl.Feedback />
                  {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
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
          </Panel>}
      </div>
    );
  }
}

export default connect(mapState, actions)(CustomerForm);