import React from 'react';

import './InfoBar.css';
const InfoBar = ({ room }) => (
    <div className="infoBar">
        <div>
            <h3>Room: {room}</h3>
        </div>
    </div>
)

export default InfoBar;