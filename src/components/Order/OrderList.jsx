import React from 'react';
import OrderItem from './OrderItem';
import { Button, Glyphicon, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'



const OrderList = ({ sales }) => {
  return (
    <div>
      <LinkContainer to="/newOrder">
        <Button bsStyle="success">
          <Glyphicon glyph="star" />
          Nova Venda
          </Button>
      </LinkContainer>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Data Embarque</th>
            <th>Data Chegada</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sales && sales.map(sale => <OrderItem key={sale.id} sale={sale} />)}
        </tbody>
      </Table>

    </div>
  );
};

export default OrderList;


