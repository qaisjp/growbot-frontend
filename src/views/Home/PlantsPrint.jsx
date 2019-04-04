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
        for (var i = 0; i < n; i++) accum[i] = iterator.call(null, i+1);
        return accum;
    };

    const qrCode = useRef();
    const count = 3;
    const codes = times(count,
        i => <QRCode key={i} value={`gbpl:${plant.id}`} level="H" size={630} style={{marginBottom: (i===count) ? "0px" : "60px"}} />
    )
    const top = "45px";
    const middle = "40px";
    const printed = (
        <div ref={qrCode} style={{display:"flex"}}>
            <div style={{ display:"flex", flexDirection:"column", marginTop: top, paddingLeft: "60px", paddingRight: middle, borderRight: "dashed black 30px"}}>{codes}</div>
            <div style={{ marginTop: top, paddingLeft: middle}}>{codes}</div>
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
