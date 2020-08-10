import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { InputProps } from './types';

import './style.css';

export default ({ 
    onKeyDown, 
    value, 
    width, 
    height 
}: InputProps) => {
    // Focus Management
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const handleBlur = () => {
        // setTimeout necessary for Firefox
        setTimeout(() => { inputRef.current && inputRef.current.focus(); }, 1);
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
            className="layer"
            cols={width} 
            rows={height}
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