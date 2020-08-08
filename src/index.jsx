import React, { useState } from "react";

import InputLayer from './layer/input.jsx';
import Layer from './layer/graphic.jsx';

import { calcHighlighterValue, parseText } from '../lib/index';
import { calcInputLayerValue, calcKeyLayerValue, calcLayerValue } from './values';

import './style.css';

const checkButtonFocus = (pos, button) =>
    pos.y === button.begin.y && pos.x >= button.begin.x && pos.x < button.begin.x + button.text.length;

const getButtonPos = button => ({
    x: button.begin.x + button.text.toLowerCase().indexOf(button.hotkey),
    y: button.begin.y
});

// ACTION
const ACTION = [
    13, // ENTER
    32  // SPACEBAR
]

// FORCE MODE
const NEXT = [ 
    9, // TAB
    39, // RIGHT
];

const PREV = [
    37, // LEFT
];

// MOVEMENT
const DIR = [
    37, 65, // LEFT
    38, 87, // UP
    39, 68, // RIGHT
    40, 83  // DOWN
];
const LEFT  = 0;
const UP    = 1;
const RIGHT = 2;
const DOWN  = 3;

export default ({ forceMode, window }) => {
    const { buttons, text, title, x, y, width, height } = window;

    const HOTKEYS = buttons.reduce((prev, curr) => {
        const key = curr.text
            .split('')
            .reduce(
                (p, c) => {
                    if (p) return p;
                    if (!prev.includes(c)) return c;
                }, '')
            .toLowerCase();

        // Mutate button
        curr.hotkey = key;
        return [ ...prev, key ];
    }, []);

    // Someone's got to do it
    const parsedButtons = buttons.map(b => ({ ...b, text: parseText(`[ ${b.text} ]`) })); 
    
    const [pos, setPos] = useState(
        forceMode && parsedButtons.length 
            ? getButtonPos(parsedButtons[0]) 
            : { x: 0, y: 0 }
        );
    
    const [i, setI] = useState(0);
    
    // Always only one is marked selected
    const [selected, rest] = parsedButtons.reduce((prev, curr) => {
        if (checkButtonFocus(pos, curr)) return [ curr, prev[1] ];
        return [ prev[0] || null, prev[1] ? [ ...prev[1], curr ] : [curr]];
    }, []);

    const handleKeyDown = (e) => {
        e.preventDefault();

        if (ACTION.includes(e.keyCode) && selected) {
            selected.action();
        }

        const k = e.key.toLowerCase();
        if (HOTKEYS.includes(k)) {
            buttons.filter(b => b.hotkey === k)[0].action();
        }

        if (forceMode) {
            if (parsedButtons.length) {
                if (PREV.includes(e.keyCode)) {
                    const bPositions = parsedButtons.map(b => getButtonPos(b));
                    const prev = i - 1 < 0 ? bPositions.length - 1 : i - 1;
                    setI(prev);
                    setPos(bPositions[prev]);
                }
                if (NEXT.includes(e.keyCode)) {
                    const bPositions = parsedButtons.map(b => getButtonPos(b));
                    const next = i + 1 === bPositions.length ? 0 : i + 1;
                    setI(next);
                    setPos(bPositions[next]);                    
                }
            }
        } else {
            const dir = { x: 0, y: 0 };
            if (DIR.includes(e.keyCode)) {
                const i = DIR.indexOf(e.keyCode);
                const mod = (i % 2 ? i - 1 : i) / 2;
                switch (mod) {
                    case LEFT:
                        dir.x -= 1;
                        break;
                    case RIGHT:
                        dir.x += 1;
                        break;
                    case UP:
                        dir.y -= 1;
                        break;
                    case DOWN:
                        dir.y += 1;
                        break;
                }
                const target = { x: pos.x + dir.x, y: pos.y + dir.y };
                if (target.x < 0)
                    target.x = width - 1;
                else if (target.x === width)
                    target.x = 0;
    
                if (target.y < 0)
                    target.y = height - 1;
                else if (target.y === height)
                    target.y = 0;
    
                setPos(target);
            }
        }        
    };
    return (
        <div className="container">
            <Layer
                value={calcLayerValue(window,
                    [
                        {  top: y, left: x, right: x + width, bottom: y + height }
                    ]
                    ,
                    [
                        title ? { begin: { x: 2, y: 0 }, text: parseText(title)} : {},
                        text ? { begin: { x: 14, y: 2 }, text: parseText(text)} : {}
                    ])} 
                style={{ backgroundColor: '#00BFF0' }}
                width={width}
                height={height}
            />
            <Layer
                value={calcLayerValue(window,
                    null,
                    rest.map(b => ({ ...b, background: true }))
                )} 
                style={{ color: 'red', backgroundColor: 'transparent' }}
                width={width}
                height={height}
            />
            {selected &&
                <Layer
                    value={calcLayerValue(window,
                        null,
                        [{ ...selected, background: true }]
                    )} 
                    style={{ color: 'green', backgroundColor: 'transparent' }}
                    width={width}
                    height={height}
                />
            }
            <Layer
                value={calcLayerValue(window,
                    null,
                    parsedButtons
                )} 
                style={{ color: 'white', backgroundColor: 'transparent' }}
                width={width}
                height={height}
            />
            <Layer
                value={calcHighlighterValue(window, pos)} 
                style={{ color: 'black', backgroundColor: 'transparent' }}
                width={width}
                height={height}
            />
            <Layer
                value={calcKeyLayerValue(window,
                    HOTKEYS,
                    parsedButtons                    
                )} 
                style={{ color: 'white', backgroundColor: 'transparent' }}
                width={width}
                height={height}
            />
            <InputLayer
                onKeyDown={handleKeyDown}
                value={calcInputLayerValue(pos, window)}
                width={width}
                height={height}
            /> 
        </div>
    );
};