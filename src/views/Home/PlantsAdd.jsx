import React, {useState} from "react";
import Modal from "../../components/Modal/Modal.jsx";

const PlantsAdd = ({visible, onClose, onSubmit}) => {
    const [newPlantName, setNewPlantName] = useState("");

    return (
        <Modal
            open={visible}
            close={onClose}
            title="Add Plant"
            content={
                <div>
                    <p>Enter a name for your new plant</p>
                    <div className="form-group">
                        <label htmlFor="inputName">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            placeholder="Name"
                            onChange={event => setNewPlantName(event.target.value)}
                        />
                    </div>
                </div>
            }
            footer={
                <>
                    <button onClick={onClose} className="btn btn-secondary">
                        Close
                    </button>
                    <button
                        onClick={onSubmit.bind(null, newPlantName)}
                        className="btn btn-primary"
                    >
                        Add
                    </button>
                </>
            }
        />
    );
};

export default PlantsAdd;
