import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

const CustomerItem = ({ customer }) => {
  return (
    <tr>
      <td>{customer.id}</td>
      <td>{customer.name}</td>
      <td>{customer.phone}</td>
      <td>{customer.mobile}</td>
      <td className="actions">
        <Button bsStyle="default">
          <Glyphicon glyph="search" />
        </Button>

        <Button bsStyle="primary">
          <Glyphicon glyph="pencil" />
        </Button>

        <Button bsStyle="danger">
          <Glyphicon glyph="trash" />
        </Button>

      </td>
      
    </tr>
  );
};

export default CustomerItem;