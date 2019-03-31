import React, { useState } from "react";
import Modal from "../../components/Modal/Modal.jsx";

const PlantsRename = ({ visible, onClose, onSubmit }) => {
  const [name, setName] = useState("");

  return (
    <Modal
      open={visible}
      close={onClose}
      title={"Rename Plant"}
      content={
        <div>
          <p>Enter a new name for your plant</p>
          <div className="form-group">
            <label htmlFor="inputName">New Name</label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Name"
              onChange={event => setName(event.target.value)}
            />
          </div>
        </div >
      }
      footer={
        <>
          <button onClick={onClose} className="btn btn-danger">
            Close
          </button>
          <button
            onClick={onSubmit.bind(null, name)}
            className="btn btn-danger"
          >
            Rename
          </button>
        </>
      }
    />
  );
};

export default PlantsRename;
