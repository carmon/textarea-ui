import React from "react";
import { TILES_W, TILES_H } from '../config';

import './style.css';

export default ({ value, style }) => 
    <textarea
        className="layer"
        cols={TILES_W} 
        rows={TILES_H}
        style={style}
        value={value}
        disabled
        readOnly
    />