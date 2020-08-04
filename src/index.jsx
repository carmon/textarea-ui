import React, { useState } from "react";
import { TEXT_WELCOME, TILES_W, TILES_H } from './config';

import InputLayer from './layer/input.jsx';
import Layer from './layer/graphic.jsx';

import './style.css';

// UI ASCII "THEME"
const TILES = {
    BUTTON_BACKGROUND: '█',
    DOUBLE_SINGLE: {
        HOR: '═',
        VER: '│',
        TOP_LEFT: '╒',
        TOP_RIGHT: '╕',
        BOTTOM_LEFT: '╘',
        BOTTOM_RIGHT: '╛'
    },
    NON_BREAKING_HYPHEN: '\u2011',
    NON_BREAKING_SPACE: '\xa0',
    SHADOW: '▓',
    USER: '_'
};

// General textarea value parser
const calculateValue = (user, boxes, texts) => 
    new Array(TILES_H).fill(0).map((_, i) => 
        new Array(TILES_W).fill(0).map((_,j) => {
            let tile;
            if (boxes) {
                const t = boxes.reduce((prev, curr) => {
                    if (prev) return prev;

                    if (i === curr.top) {
                        if (j === curr.left)
                            return TILES.DOUBLE_SINGLE.TOP_LEFT;
                        if (j === curr.right)
                            return TILES.DOUBLE_SINGLE.TOP_RIGHT;
                        if (j > curr.left && j < curr.right)
                            return TILES.DOUBLE_SINGLE.HOR;
                    }

                    if (i === curr.bottom) {
                        if (j === curr.left)
                            return TILES.DOUBLE_SINGLE.BOTTOM_LEFT;
                        if (j === curr.right)
                            return TILES.DOUBLE_SINGLE.BOTTOM_RIGHT;
                        if (j > curr.left && j < curr.right)
                            return TILES.DOUBLE_SINGLE.HOR;
                    } 
                    if ((j === curr.left || j === curr.right) && i > curr.top && i < curr.bottom)
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

const calculateInputValue = (user) =>
    new Array(TILES_H).fill(0).map((_, i) => 
        new Array(TILES_W).fill(0).map((_,j) => {
            if (user) {
                if (j === user.x && i === user.y)
                    return TILES.USER;
            }
            
            return TILES.NON_BREAKING_SPACE;
        }).join('')
    ).join('');

// Parsers
const parseText = text =>
    text
        .replace(/ /gi, TILES.NON_BREAKING_SPACE)
        .replace(/-/gi, TILES.NON_BREAKING_HYPHEN);

// Controllers
const createButton = (begin, text) => ({
    begin,
    text: parseText(`[ ${text} ]`)
})

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

export default () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const button = createButton({ x: 10, y: 5 }, 'Button Example');
    button.selected = pos.y === button.begin.y && pos.x >= button.begin.x && pos.x < button.begin.x + button.text.length;

    const handleKeyDown = (e) => {
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
                target.x = TILES_W - 1;
            else if (target.x === TILES_W)
                target.x = 0;

            if (target.y < 0)
                target.y = TILES_H - 1;
            else if (target.y === TILES_H)
                target.y = 0;

            setPos(target);
        }
    };
    
    return (
        <div className="container">
            <Layer 
                value={calculateValue(null, 
                    [
                        {  top: 0, left: 0, right: TILES_W - 1, bottom: TILES_H - 1 },
                        {  top: 6, left: 10, right: 40, bottom: 20 }
                    ]
                    ,
                    [
                        { begin: { x: 2, y: 0 }, text: parseText('textarea-ui')},
                        { begin: { x: 2, y: 1 }, text: parseText(TEXT_WELCOME) }
                    ])} 
                style={{ backgroundColor: '#00BFF0' }}
            />
            <Layer
                value={calculateValue(null,
                    null,
                    [
                        { ...button, background: true },
                        { begin: { x: 2, y: 2 }, text: parseText(TEXT_WELCOME) }
                    ]
                )} 
                style={{ color: button.selected ? 'green' : 'red', backgroundColor: 'transparent' }}
            />
            <Layer
                value={calculateValue(null,
                    null,
                    [
                        button,
                        { begin: { x: 2, y: 3 }, text: parseText(TEXT_WELCOME) }
                    ]
                )} 
                style={{ color: 'white', backgroundColor: 'transparent' }}
            />
            <InputLayer
                onKeyDown={handleKeyDown}
                value={calculateInputValue(pos)}
            /> 
        </div>
    );
};