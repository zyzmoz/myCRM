import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Row, Col, Button, Glyphicon, Panel } from 'react-bootstrap';
import OrderServiceItem from './OrderServiceItem';



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

      <Panel.Body style={styles.container}>

        <FormGroup>
          <Row>
            <Col xs={8} md={6}>
              <ControlLabel>Descrição</ControlLabel>
              <FormControl
                type="text"
                placeholder="Serviço"
                name="description"
                value={description}
                onChange={e => this.handleChange(e)}

              />
            </Col>
            <Col xs={4} md={3}>
              <ControlLabel>Início</ControlLabel>
              <FormControl
                type="date"
                placeholder="Data de Início"
                name="starts_at"
                value={starts_at}
                onChange={e => this.handleChange(e)}

              />
            </Col>
            <Col xs={4} md={3}>
              <ControlLabel>Fim</ControlLabel>
              <FormControl
                type="date"
                placeholder="Data de Fim"
                name="ends_at"
                value={this.state.ends_at}
                onChange={e => this.handleChange(e)}

              />
            </Col>
          </Row>
        </FormGroup>

        <Button bsStyle="success" onClick={() => this.addService()} >
          <Glyphicon glyph="star" />
          Incluir Serviço
          </Button>
        <div style={styles.list}>
          <p><b>Serviços Selecionados</b></p>
          {services && services.map((service, i) => <OrderServiceItem key={i} service={service} />)}
        </div>
      </Panel.Body>

    );
  }
}

const styles = {
  container: {
  

  },
  list: {
    marginTop: '20px'
  },
  edit: {
    width: '450px'
  },
  date: {
    width: '100px'
  }
}


export default OrderServices;