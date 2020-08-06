import React from "react";

import './style.css';

export default ({ value, style, width, height }) => 
    <textarea
        className="layer"
        cols={width} 
        rows={height}
        style={style}
        value={value}
        disabled
        readOnly
    />