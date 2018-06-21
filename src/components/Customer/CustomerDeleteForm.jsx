import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomerDeleteForm = ({handleDelete, handleCancel, customer}) => {
  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Deseja excluir o Cliente: {customer.name} ?</Modal.Title>
        </Modal.Header>

        <Modal.Body>A exclusão deste cliente é irreversível!</Modal.Body>

        <Modal.Footer>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={() => handleDelete()} bsStyle="danger">Excluir</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default CustomerDeleteForm;