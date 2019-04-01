import React, {useRef} from "react";
import Modal from "../../components/Modal/Modal.jsx";
import QRCode from "qrcode.react";
import ReactToPrint from 'react-to-print';


const PlantsPrint = ({ visible, onClose, onSubmit, plant }) => {
    if (!visible) {
        return null;
    }

    // From https://stackoverflow.com/a/18500019/1517394
    const times = function(n, iterator) {
        var accum = Array(Math.max(0, n));
        for (var i = 0; i < n; i++) accum[i] = iterator.call(null, i);
        return accum;
    };

    const qrCode = useRef();
    const printed = (
        <div ref={qrCode}>
            {
                times(6,
                    i => <QRCode key={i} value={`gbpl:${plant.id}`} level="H" size={925} includeMargin={true} style={{borderRight: "dashed black 20px"}} />
                )
            }
        </div>
    )

    return (
        <Modal
            open={visible}
            close={onClose}
            title={`Print QR code for ${plant.name}`}
            content={
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <QRCode value={`gbpl:${plant.id}`} level="H" size={200} />
                    <div style={{display: "none", width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>{printed}</div>
                </div>
            }
            footer={
                <>
                    <button onClick={onClose} className="btn btn-secondary">
                        Close
                    </button>
                    <ReactToPrint
                        trigger={() => <button className="btn btn-primary">Print</button>}
                        content={() => qrCode.current}
                    />
                </>
            }
        />
    );
};

export default PlantsPrint;
