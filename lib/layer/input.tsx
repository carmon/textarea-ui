import * as React from "react";
import { useRef, useState } from "react";

import useInterval from '../helpers/use-interval';
import { InputProps } from './types';

import './style.css';

export default ({ 
    onKeyDown,
    onKeyUp,
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
    useInterval(() => {
        setColor(() => color === 'white' ? 'black' : 'white');
    }, 450)

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
            onKeyUp={onKeyUp}
            ref={inputRef}
            // This is just to ignore a react error
            readOnly
        />
    );
};