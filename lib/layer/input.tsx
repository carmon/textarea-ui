import * as React from "react";
import { useRef, useState } from "react";

import useInterval from '../helpers/use-interval';
import { pixelToCoord, stylePosToCoord } from '../defaults/utils';
import { InputProps } from './types';

import './style.css';

const InputLayer = ({ 
    onKeyDown,
    onKeyUp,
    onMouseMove,
    onMouseUp,
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

    // const [hover, setHover] = useState(false);
    // const handleMouseEnter = () => {
    //     setHover(true);
    // };

    const handleMouseMove = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        const windowCoord = stylePosToCoord({ left: style.left, top: style.top });
        const mouseCoord = pixelToCoord({ x: e.clientX, y: e.clientY });
        onMouseMove?.({ x: mouseCoord.x - windowCoord.x, y: mouseCoord.y - windowCoord.y });
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        const windowCoord = stylePosToCoord({ left: style.left, top: style.top });
        const mouseCoord = pixelToCoord({ x: e.clientX, y: e.clientY });
        onMouseUp?.({ x: mouseCoord.x - windowCoord.x, y: mouseCoord.y - windowCoord.y });
    };
    
    // const handleMouseLeave = () => {
    //     setHover(false);
    // };

    return (
        <textarea 
            autoFocus
            className="layer"
            cols={width} 
            rows={height}
            value={value} 
            style={{ ...style, color, backgroundColor: 'transparent' }}
            onBlur={handleBlur}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            onMouseMoveCapture={handleMouseMove}
            onMouseUp={handleMouseUp}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            ref={inputRef}            
            readOnly // This is just to ignore a react error
        />
    );
};

export default InputLayer;
