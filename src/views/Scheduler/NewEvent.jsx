import React from "react";
import Modal from "../../components/Modal/Modal";

const NewEvent = ({visible, onClose, content, footer}) => {
    return (
        <Modal
                open={visible}
                close={onClose}
                title="Scheduler"
                content={content}
                footer={footer}
            />
    )
}

export default NewEvent;
