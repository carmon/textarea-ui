import * as React from "react";
import { useRef, useState } from "react";

import useInterval from '../helpers/use-interval';
import { InputProps } from './types';

import './style.css';

const InputLayer = ({ 
    onKeyDown,
    onKeyUp,
    style = {},
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

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        e;
        // const startX = style.left ? style.left.split('em')[0] : 0;
        // const startY = style.top ? style.top.split('em')[0] : 0;
        // console.log(startX, startY);
        // console.log(e.clientX, e.clientY);
        // console.log(e.clientX - startX, e.clientY - startY);
    };
    
    const handleMouseLeave = () => {
        setHover(false);
    };

    return (
        <textarea 
            autoFocus
            className="layer"
            cols={width} 
            rows={height}
            value={value} 
            style={{ ...style, color, backgroundColor: 'transparent', cursor: hover ? 'crosshair' : 'default' }}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMoveCapture={handleMouseMove}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            ref={inputRef}            
            readOnly // This is just to ignore a react error
        />
    );
};

export default InputLayer;
