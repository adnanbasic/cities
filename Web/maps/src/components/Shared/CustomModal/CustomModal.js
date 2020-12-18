import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function CustomModal({ title, content, button1Title, button2Title, button1Click, button2Click }) {
  return (
    <div className="modal-container">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{content}</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => button1Click()}>
            {button1Title}
          </Button>
          <Button variant="primary" onClick={() => button2Click()}>
            {button2Title}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default CustomModal;
