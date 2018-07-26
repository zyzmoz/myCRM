import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const UserItem = ({ user, currentUser, openDelete }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.phone}</td>
      <td>{user.mobile}</td>
      <td className="actions">
        <LinkContainer to={`/user/${user.id}`} className="action-button">
          <Button bsStyle="default">
            <Glyphicon glyph="search" />

          </Button>
        </LinkContainer>
        <LinkContainer to={`/userManage/${user.id}`} className="action-button">
          <Button bsStyle="primary">
            <Glyphicon glyph="pencil" />

          </Button>
        </LinkContainer>
        
        <Button disabled={user.id === currentUser}  onClick={() => openDelete(user)} bsStyle="danger" className="action-button">
          <Glyphicon glyph="trash" />
        </Button>

      </td>

    </tr>
  );
};

export default UserItem;