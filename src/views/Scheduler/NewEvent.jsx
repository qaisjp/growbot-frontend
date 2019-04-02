import React from "react";
import Modal from "../../components/Modal/Modal";

const NewEvent = ({visible, onClose, content, onSubmit}) => {
    return (
        <Modal
                open={visible}
                close={onClose}
                title="Scheduler"
                content={content}
                footer={
                    <>
                        <button onClick={onClose} className="btn btn-secondary">
                            Close
                        </button>
                        <button onClick={onSubmit} className="btn btn-primary">
                            Schedule
                        </button>
                    </>
                }
            />
    )
}

export default NewEvent;
