import React, { useEffect, useRef, useState } from "react";
import { TILES_W, TILES_H } from '../config';

import './style.css';

export default ({ onKeyDown, value }) => {
    // Focus Management
    const inputRef = useRef(null);
    const handleBlur = () => {
        // setTimeout necessary for Firefox
        setTimeout(() => { inputRef.current.focus(); }, 1);
    };

    // Color tilt
    const [color, setColor] = useState('white');
    useEffect(() => {    
        const timer = setTimeout(() => {
            setColor(() => color === 'white' ? 'black' : 'white');
        }, 450);
        return () => clearTimeout(timer);
      }, [ color ]);

    return (
        <textarea 
            autoFocus
            // This class is loaded inside layer stylesheet
            className="layer"
            cols={TILES_W} 
            rows={TILES_H}
            value={value} 
            style={{ color, backgroundColor: 'transparent' }}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            ref={inputRef}
            // This is just to ignore a react error
            readOnly
        />
    );
};