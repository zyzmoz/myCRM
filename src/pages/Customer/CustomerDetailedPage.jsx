import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCustomer } from '../../actions/customer';
import { Panel, Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import format from 'date-fns/format';

const mapState = (state) => ({
  customer: state.customer.object
});

const actions = {
  getCustomer
}

class CustomerDetailedPage extends Component {
  async componentDidMount() {
    const { id } = this.props.match.params;
    const { getCustomer } = this.props;
    console.log(id);

    await getCustomer(id);
  }
  render() {
    console.log(this.props);
    const { customer } = this.props;
    return (
      <div className="container">
        {customer &&
          <Panel bsStyle="info">
            <Panel.Heading>
              <Panel.Title componentClass="h3"><strong>Cliente: </strong>{customer.name}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Grid className="grid">
                <Row className="show-grid">
                  <Col xs={6} md={4}>
                    <strong>RG: </strong>{customer.doc_id}
                  </Col>
                  <Col xs={6} md={4}>
                    <strong>CPF/CNPJ: </strong>{customer.cpf_cnpj}
                  </Col>
                  <Col xs={6} md={4}>
                    <strong>Nascimento: </strong>{format(customer.birthdate, 'DD/MM/YYYY')}
                  </Col>
                </Row>

                <Row className="show-grid">
                  <Col xs={6} md={4}>
                    <strong>Endereco: </strong>{customer.address}
                  </Col>
                  <Col xs={6} md={4}>
                    <strong>Bairro: </strong>{customer.neighborhood}
                  </Col>
                  <Col xs={3} md={2}>
                    <strong>Cidade: </strong>{customer.city}
                  </Col>
                  <Col xs={3} md={2}>
                    <strong>UF: </strong>{customer.state}
                  </Col>
                </Row>

                <Row className="show-grid">
                  <Col xs={6} md={4}>
                    <strong>Telefone: </strong>{customer.phone}
                  </Col>
                  <Col xs={6} md={4}>
                    <strong>Celular: </strong>{customer.mobile}
                  </Col>
                  <Col xs={6} md={4}>
                    <strong>Email: </strong>{customer.email}
                  </Col>
                </Row>

                <Row className="show-grid">
                  <Col xs={8} md={6}>
                    <strong>Programa de Fidelidade: </strong>
                    <p>{customer.fidelity}</p>
                  </Col>
                  <Col xs={8} md={6}>
                    <strong>Observações: </strong>
                    <p>{customer.obs}</p>
                  </Col>
                </Row>
              </Grid>
              <hr />              
              <Button onClick={() => this.props.history.goBack()} >
                <Glyphicon glyph="arrow-left"/>
                Voltar
              </Button>

              <Button bsStyle="primary" style={{float: 'right'}}>
                <Glyphicon glyph="pencil"/>
                Editar
              </Button>
            </Panel.Body>
          </Panel>

        }
      </div>
    );
  }
}

export default connect(mapState, actions)(CustomerDetailedPage);