import React, { useState } from "react";
import { TILES } from './config';

import InputLayer from './layer/input.jsx';
import Layer from './layer/graphic.jsx';

import { parseText } from './helpers';

import './style.css';

// General textarea value parser
const calculateValue = ({ width, height }, boxes, texts) => 
    new Array(height).fill(0).map((_, i) => 
        new Array(width).fill(0).map((_,j) => {
            let tile;
            if (boxes) {
                const t = boxes.reduce((prev, curr) => {
                    if (prev) return prev;

                    if (i === curr.top) {
                        if (j === curr.left)
                            return TILES.DOUBLE_SINGLE.TOP_LEFT;
                        if (j === curr.right - 1)
                            return TILES.DOUBLE_SINGLE.TOP_RIGHT;
                        if (j > curr.left && j < curr.right - 1)
                            return TILES.DOUBLE_SINGLE.HOR;
                    }

                    if (i === curr.bottom - 1) {
                        if (j === curr.left)
                            return TILES.DOUBLE_SINGLE.BOTTOM_LEFT;
                        if (j === curr.right - 1)
                            return TILES.DOUBLE_SINGLE.BOTTOM_RIGHT;
                        if (j > curr.left && j < curr.right - 1)
                            return TILES.DOUBLE_SINGLE.HOR;
                    } 
                    if ((j === curr.left || j === curr.right - 1) && i > curr.top && i < curr.bottom)
                        return TILES.DOUBLE_SINGLE.VER;
                    
                    return '';
                }, '');
                if (t) tile = t;
            }

            if (texts) {
                const t = texts.reduce((prev, curr) => {
                    if (prev) return prev;

                    if (i === curr.begin.y) {
                        if (j >= curr.begin.x && j < curr.begin.x + curr.text.length) {
                            return curr.background ? TILES.BUTTON_BACKGROUND : curr.text.charAt(j - curr.begin.x);
                        }
                    }
                    return '';
                }, '');
                if (t) tile = t;
            }
            
            return tile || TILES.NON_BREAKING_SPACE;
        }).join('')
    ).join('');

const calculateInputValue = (user, { width, height }) =>
    new Array(height).fill(0).map((_, i) => 
        new Array(width).fill(0).map((_,j) => {
            if (user) {
                if (j === user.x && i === user.y)
                    return TILES.USER;
            }
            
            return TILES.NON_BREAKING_SPACE;
        }).join('')
    ).join('');

const checkButtonFocus = (pos, button) =>
    pos.y === button.begin.y && pos.x >= button.begin.x && pos.x < button.begin.x + button.text.length;

// ACTION
const ACTION = [
    13, // ENTER
    32  // SPACEBAR
]

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

export default ({ window }) => {
    const { buttons, text, title, x, y, width, height } = window;

    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleKeyDown = (e) => {
        e.preventDefault();

        if (ACTION.includes(e.keyCode) && buttons.some(b => b.selected)) {
            buttons.filter(b => b.selected)[0].action();
        }

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
    };

    buttons.forEach(b => { b.selected = checkButtonFocus(pos, b); });    
    return (
        <div className="container">
            <Layer 
                value={calculateValue(window, 
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
                value={calculateValue(window,
                    null,
                    [
                        ...buttons.filter(b => !b.selected).map(b => ({ ...b, background: true }))
                    ]
                )} 
                style={{ color: 'red', backgroundColor: 'transparent' }}
                width={width}
                height={height}
            />
            {buttons.some(b => b.selected) &&
                <Layer
                    value={calculateValue(window,
                        null,
                        [
                            ...buttons.filter(b => b.selected).map(b => ({ ...b, background: true }))
                        ]
                    )} 
                    style={{ color: 'green', backgroundColor: 'transparent' }}
                    width={width}
                    height={height}
                />
            }
            <Layer
                value={calculateValue(window,
                    null,
                    buttons
                )} 
                style={{ color: 'white', backgroundColor: 'transparent' }}
                width={width}
                height={height}
            />
            <InputLayer
                onKeyDown={handleKeyDown}
                value={calculateInputValue(pos, window)}
                width={width}
                height={height}
            /> 
        </div>
    );
};