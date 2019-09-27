import React, { Component } from 'react';
import { Panel, FormGroup, FormControl, ControlLabel, Button, Glyphicon, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Autocomplete from 'react-autocomplete';
import { queryCustomers } from '../../actions/customer';
import OrderServices from './OrderServices';
import moment from 'moment';



const mapState = (state) => ({
  customers: state.customer.list,
});

const actions = {
  queryCustomers
}

class OrderForm extends Component {
  state = {
    pristine: true,
    submitting: false,
    formData: {
      id: null,
      customer_id: null,
      customer_name: '',
      description: '',
      created_at: moment().format('YYYY-MM-DD'),
      starts_at: moment().format('YYYY-MM-DD'),
      ends_at: moment().format('YYYY-MM-DD'),
      created_by: 1,
      services: [

      ]
    },
    value: '',
    id: null
  }

  componentDidMount() {
    this.props.queryCustomers();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const { formData } = this.state;
    this.setState({ formData: { ...formData, [name]: value }, pristine: false });
  }
  filterCustomer = (value) => {
    this.setState({ value });
    const { formData } = this.state;
    this.props.queryCustomers(value);
  }
  addService = (service) => {
    const { formData } = this.state;
    let services = this.state.formData.services;
    services = [...services, service];

    this.setState({ formData: { ...formData, services }, pristine: false });
    console.log(this.state);
  }

  selectCustomer = (customer) => {
    const { formData } = this.state;
    this.setState({ formData: { ...formData, customer_id: customer.id, customer_name: customer.name } });
  }

  render() {
    const { customers } = this.props;
    const { submitting, pristine, formData, value } = this.state;
    const { services } = this.state.formData;
    console.log('c', customers);
    return (
      <div className="padding window">

        <Panel>
          <Panel.Heading>
            <Panel.Title>Venda</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <FormGroup>
                <ControlLabel>Cliente</ControlLabel>
                {
                  customers && <Autocomplete
                    wrapperStyle={{
                      width: '100%'
                    }}

                    menuStyle={
                      {
                        borderRadius: '3px',
                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '2px 0',
                        fontSize: '90%',
                        position: 'fixed',
                        overflow: 'auto',
                        maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom         
                        border: '1px solid #1e72df',
                        zIndex: '99'
                      }
                    }

                    getItemValue={(item) => item.name}
                    items={customers}
                    renderItem={(item, isHighlighted) =>
                      <div className="auto-items" key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.name}
                      </div>
                    }
                    value={value}
                    onChange={(e) => this.filterCustomer(e.target.value)}
                    onSelect={(val, item) => this.setState({ value: val, id: item._id })}
                    inputProps={{
                      className: 'form-control'
                    }}

                  />}
              </FormGroup>
              <FormGroup>
                <ControlLabel>Descrição</ControlLabel>
                <FormControl
                  type="text"
                  value={formData.description}
                  placeholder="Descrição"
                  name="description"
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>

              <FormGroup>
                <Row>
                  <Col xs={8} md={6}>
                    <ControlLabel>Início</ControlLabel>
                    <FormControl
                      type="date"
                      value={formData.starts_at}
                      placeholder="Data de Embarque"
                      name="starts_at"
                      onChange={e => this.handleChange(e)}
                    />
                  </Col>
                  <Col xs={8} md={6}>
                    <ControlLabel>Fim</ControlLabel>
                    <FormControl
                      type="date"
                      value={formData.ends_at}
                      placeholder="Data de Chegada"
                      name="ends_at"
                      onChange={e => this.handleChange(e)}
                    />
                  </Col>
                </Row>
              </FormGroup>

              <div className="services">
                <OrderServices addService={this.addService} services={services} />
              </div>

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
      </div>
    );
  }
}

export default connect(mapState, actions)(OrderForm);