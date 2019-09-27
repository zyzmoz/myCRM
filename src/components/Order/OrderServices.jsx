import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Row, Col, Button, Glyphicon, Panel } from 'react-bootstrap';



class OrderServices extends Component {
  state = {
    description: '',
    ends_at: null,
    starts_at: null
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  addService = () => {
    this.props.addService(this.state);
    this.setState({
      description: '',
      ends_at: null,
      starts_at: null
    });
  }


  render() {
    const { services } = this.props;
    const {
      description,
      ends_at,
      starts_at
    } = this.state;

    return (

      <Panel.Body>

        <FormGroup>
          <Row>
            <Col xs={8} md={6}>
              <ControlLabel>Descrição</ControlLabel>
              <FormControl
                type="text"
                placeholder="Serviço"
                name="description"
                onChange={e => this.handleChange(e)}
                value={description}
              />
            </Col>
            <Col xs={4} md={3}>
              <ControlLabel>Início</ControlLabel>
              <FormControl
                type="date"
                placeholder="Data de Início"
                name="starts_at"
                onChange={e => this.handleChange(e)}
                value={starts_at}
              />
            </Col>
            <Col xs={4} md={3}>
              <ControlLabel>Fim</ControlLabel>
              <FormControl
                type="date"
                placeholder="Data de Fim"
                name="ends_at"
                onChange={e => this.handleChange(e)}
                value={ends_at}
              />
            </Col>
          </Row>
        </FormGroup>

        <Button bsStyle="success" onClick={() => this.addService()} >
          <Glyphicon glyph="star" />
          Incluir Serviço
          </Button>

        {services && services.map((service, i) => <div key={i}>{service.description}</div>)}
      </Panel.Body>

    );
  }
}


export default OrderServices;