import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import CustomerList from '../../components/Customer/CustomerList';
import { queryCustomers } from '../../actions/customer';

const mapState = (state) => ({
  customers: state.customer.list
});

const actions = {
  queryCustomers
}

class CustomerPage extends Component {
  state = {
    search: ''
  }
  componentWillMount() {
    this.props.queryCustomers();
  }

  queryCustomers = async (str) =>{    
    await this.setState({search: str});    
    await this.props.queryCustomers(this.state.search);
  }
  

  render() {
    const { customers } = this.props;
    
    return (
      <div className="padding">
        <h3>Clientes</h3>
        <form>
          <FormGroup

          >
            <ControlLabel>Buscar</ControlLabel>
            <FormControl
              type="text"   
              value={this.state.search}           
              placeholder="Digite um nome"
              onChange={(e) => this.queryCustomers(e.target.value)}
            />
            <FormControl.Feedback />

          </FormGroup>
        </form>
        <br />
        <CustomerList customers={customers} />
      </div>
    )
  }
}


export default connect(mapState, actions)(CustomerPage);