import * as React from 'react';

import { LayerProps } from './types';

import './style.css';

export default ({ value, style, width, height }: LayerProps) => 
    <textarea
        className="layer"
        cols={width} 
        rows={height}
        style={style}
        value={value}
        disabled
        readOnly
    />