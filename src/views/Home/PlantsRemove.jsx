import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal.jsx";

const PlantsRemove = ({ visible, onClose, onSubmit }) => {
  return (
    <Modal
      open={visible}
      close={onClose}
      title="Remove Plant"
      content={<p>Are you sure you want to remove this plant?</p>}
      footer={
        <>
          <button onClick={onClose} className="btn btn-danger">
            No
          </button>
          <button onClick={onSubmit} className="btn btn-danger">
            Yes
          </button>
        </>
      }
    />
  );
};

export default PlantsRemove;
