import React from 'react';
import { Table } from 'react-bootstrap';
import CustomerItem from './CustomerItem';

const CustomerList = ({ customers, openDelete }) => {
  return (
    <div>
      
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Celular</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            customers && customers.map(customer =>
              <CustomerItem key={customer.id} customer={customer} openDelete={openDelete} />
            )
          }

        </tbody>
      </Table>
    </div>
  );
};

export default CustomerList;