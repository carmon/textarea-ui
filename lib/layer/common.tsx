import * as React from 'react';

import { LayerProps } from './types';

import './style.css';

const CommonLayer = ({ value, style, width, height }: LayerProps) => 
    <textarea
        className="layer"
        cols={width} 
        rows={height}
        style={style}
        value={value}
        disabled
        readOnly
    />;

export default CommonLayer; 