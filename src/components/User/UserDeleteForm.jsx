import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserDeleteForm = ({handleDelete, handleCancel, user}) => {
  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Deseja excluir o Usuário: {user.name} ?</Modal.Title>
        </Modal.Header>

        <Modal.Body>A exclusão deste usuário é irreversível!</Modal.Body>

        <Modal.Footer>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={() => handleDelete(user.id)} bsStyle="danger">Excluir</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default UserDeleteForm;