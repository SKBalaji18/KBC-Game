import React from 'react';
import {QRCodeSVG} from 'qrcode.react';

const QRCodeDisplay = () => {
    const url = `${window.location.origin}/mobile`; // Current URL
    return (
        <div className="qr-code">
            <h3>Scan to Join!</h3>
            <QRCodeSVG value={url} />
        </div>
    );
};

export default QRCodeDisplay;
