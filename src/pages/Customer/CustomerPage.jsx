import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

const mapState = (state) => ({
  customer: state.customer
})

const CustomerPage = ({customer}) => {
  console.log('Customer', this.props);
  
  return (
    <div className="container">
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default connect(mapState)(CustomerPage);