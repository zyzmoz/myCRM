import React from 'react';
import {Modal} from 'react-bootstrap';

const Modal = ({children}) => {
  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};

export default Modal;