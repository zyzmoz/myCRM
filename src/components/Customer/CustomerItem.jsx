import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CustomerItem = ({ customer, openDelete }) => {
  return (
    <tr>
      <td>{customer.id}</td>
      <td>{customer.name}</td>
      <td>{customer.phone}</td>
      <td>{customer.mobile}</td>
      <td className="actions">
        <LinkContainer to={`/customer/${customer.id}`} className="action-button">
          <Button bsStyle="default">
            <Glyphicon glyph="search" />
          
          </Button>
        </LinkContainer>
        <LinkContainer to={`/customerManage/${customer.id}`} className="action-button">
          <Button bsStyle="primary">
            <Glyphicon glyph="pencil" />
          
          </Button>
        </LinkContainer>

        <Button onClick={() => openDelete(customer)} bsStyle="danger" className="action-button">
          <Glyphicon glyph="trash" />
          
        </Button>

      </td>

    </tr>
  );
};

export default CustomerItem;