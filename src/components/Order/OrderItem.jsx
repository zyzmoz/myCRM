import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const OrderItem = ({ sale }) => {
  return (
    <tr>
      <td>{sale.id}</td>
      <td>{sale.customer_name}</td>
      <td>{sale.starts_at}</td>
      <td>{sale.ends_at}</td>
      <td>
        <LinkContainer to={`/`} className="action-button">
          <Button bsStyle="default">
            <Glyphicon glyph="search" />

          </Button>
        </LinkContainer>
        <LinkContainer to={`/`} className="action-button">
          <Button bsStyle="primary">
            <Glyphicon glyph="pencil" />

          </Button>
        </LinkContainer>

        <Button bsStyle="danger" className="action-button">
          <Glyphicon glyph="trash" />

        </Button>
      </td>
    </tr>

  );
};

export default OrderItem;