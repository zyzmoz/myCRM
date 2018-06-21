import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CustomerItem = ({ customer }) => {
  return (
    <tr>
      <td>{customer.id}</td>
      <td>{customer.name}</td>
      <td>{customer.phone}</td>
      <td>{customer.mobile}</td>
      <td className="actions">
        <LinkContainer to={`/customer/${customer.id}`}>
          <Button bsStyle="default">
            <Glyphicon glyph="search" />
          </Button>
        </LinkContainer>

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