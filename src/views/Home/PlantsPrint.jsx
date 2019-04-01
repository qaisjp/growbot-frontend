import React from "react";
import Modal from "../../components/Modal/Modal.jsx";
import QRCode from "qrcode.react";

const PlantsPrint = ({ visible, onClose, onSubmit, plant }) => {
    if (!visible) {
        return null;
    }

    return (
        <Modal
            open={visible}
            close={onClose}
            title={`Print QR code for ${plant.name}`}
            content={
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <QRCode value={`gbpl:${plant.id}`} level="H" size={200} />
                </div>
            }
            footer={
                <>
                    <button onClick={onClose} className="btn btn-danger">
                        Close
                    </button>
                </>
            }
        />
    );
};

export default PlantsPrint;
