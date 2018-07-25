import React from 'react';
import { Table } from 'react-bootstrap';
import UserItem from './UserItem';

const UserList = ({users, openDelete}) => {
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
            users && users.map(user =>
              <UserItem key={user.id} user={user} openDelete={openDelete} />
            )
          }

        </tbody>
      </Table>
    </div>
  );
};

export default UserList;