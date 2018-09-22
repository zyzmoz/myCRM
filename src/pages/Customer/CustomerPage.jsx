import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl, Button, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CustomerList from '../../components/Customer/CustomerList';
import { queryCustomers, startDeleteCustomer, deleteCustomer } from '../../actions/customer';
import CustomerDeleteForm from '../../components/Customer/CustomerDeleteForm';
import PaginationComponent from '../../components/Pagination/PaginationComponent';

const mapState = (state) => ({
  customers: state.customer.list,
  customer: state.customer.object,
  pages: state.customer.pages,
});

const actions = {
  queryCustomers,
  startDeleteCustomer,
  deleteCustomer
}

class CustomerPage extends Component {
  state = {
    search: '',
    activePage: 1,
    deleting: false,
    customer: {}
  }
  componentWillMount() {
    this.props.queryCustomers();
  }

  queryCustomers = async (str) => {
    await this.setState({ search: str });
    await this.props.queryCustomers(this.state.search);
  }

  handlePageChange = async (pageNumber, next) => {
    await this.setState({ activePage: pageNumber });
    await this.props.queryCustomers(this.state.search, next);
  }

  handleOpenDelete = async (customer) => {
    await this.props.startDeleteCustomer({ ...customer, deleting: true });
    console.log(this.props);
  }

  handleCancelDelete = async (customer) => {
    await this.props.startDeleteCustomer({ ...customer, deleting: false });
  }

  handleDelete = async (id) => {
    await this.props.deleteCustomer(id);
    await this.setState({activePage:1});
    console.log(this.props);
  }


  render() {
    const { customers, customer, pages } = this.props;
    return (
      <div className="padding window">
        {customer && customer.deleting &&
          <CustomerDeleteForm customer={customer} handleDelete={this.handleDelete} handleCancel={this.handleCancelDelete}/>
        }
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
        <LinkContainer to="/createCustomer">
          <Button bsStyle="success">
            <Glyphicon glyph="star" />
            
            Novo
          </Button>
        </LinkContainer>
        <br />
        <CustomerList customers={customers} openDelete={this.handleOpenDelete} />
        <PaginationComponent activePage={this.state.activePage} pages={pages} handlePageChange={this.handlePageChange} customers={customers}/>
      </div>
    )
  }
}


export default connect(mapState, actions)(CustomerPage);