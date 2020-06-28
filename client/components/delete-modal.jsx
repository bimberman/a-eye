import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function DeleteModal(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button outline color="danger" onClick={toggle}>{props.buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Delete Confirmation</ModalHeader>
        <ModalBody>
          {`Are you sure you want to delete ${props.dog} from your saved dogs?`}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => { toggle(); props.deleteHandler(); }}>Delete</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
