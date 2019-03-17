import React from "react";
import {Modal as BootstrapModal} from "react-bootstrap";

const Modal = props => {
  const {open, close, title, content, footer} = props;

  return (
    <BootstrapModal show={open} onHide={close}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>

      <BootstrapModal.Body>
        {content}
      </BootstrapModal.Body>

      <BootstrapModal.Footer>
        {footer}
      </BootstrapModal.Footer>
    </BootstrapModal>
  )
};

export default Modal;