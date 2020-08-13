import * as React from 'react';
import { useState } from 'react';

import CommonLayer from './layer/common';
import InputLayer from './layer/input';

import { Box, Button, Mapper, Window, Coord } from './types';
import { checkButtonFocus, getButtonPos, parseText, THEME, NON_BREAKING } from './util';

import './style.css';

const screen = ({ width, height }: Window, func: Mapper<any>) => (...args:any[]) =>
    new Array(height).fill(0).map((_, y) => 
        new Array(width).fill(0).map((_,x) => 
            func({ x , y }, ...args)
        ).join('')
    ).join('');

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

interface PropTypes {
    forceMode: boolean;
    window: Window;
}

export default ({ forceMode, window }: PropTypes) => {
    const { buttons, text, title, x, y, width, height } = window;

    const HOTKEYS = buttons.reduce((prev: string[], curr: Button) => {
        const key = curr.text
            .split('')
            .reduce(
                (p, c) => {
                    if (p) return p;
                    if (!prev.includes(c)) return c;
                    return '';
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
    const [selected, rest] = parsedButtons.reduce((prev: any, curr) => {
        if (checkButtonFocus(pos, curr)) return [ curr, prev[1] ];
        return [ prev[0] || null, prev[1] ? [ ...prev[1], curr ] : [curr]];
    }, [undefined, []]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

    const calcLayerValue = screen(window, (tilePos: Coord, boxes: Box[], texts: Button[]) => {
        let tile;
        if (boxes) {
            const t = boxes.reduce((prev, curr) => {
                if (prev) return prev;

                if (tilePos.y === curr.top) {
                    if (tilePos.x === curr.left)
                        return THEME.DOUBLE_SINGLE.TOP_LEFT;
                    if (tilePos.x === curr.right - 1)
                        return THEME.DOUBLE_SINGLE.TOP_RIGHT;
                    if (tilePos.x > curr.left && tilePos.x < curr.right - 1)
                        return THEME.DOUBLE_SINGLE.HOR;
                }

                if (tilePos.y === curr.bottom - 1) {
                    if (tilePos.x === curr.left)
                        return THEME.DOUBLE_SINGLE.BOTTOM_LEFT;
                    if (tilePos.x === curr.right - 1)
                        return THEME.DOUBLE_SINGLE.BOTTOM_RIGHT;
                    if (tilePos.x > curr.left && tilePos.x < curr.right - 1)
                        return THEME.DOUBLE_SINGLE.HOR;
                } 
                if ((tilePos.x === curr.left || tilePos.x === curr.right - 1) && tilePos.y > curr.top && tilePos.y < curr.bottom)
                    return THEME.DOUBLE_SINGLE.VER;
                
                return '';
            }, '');
            if (t) tile = t;
        }

        if (texts) {
            const t = texts.reduce((prev, curr) => {
                if (prev) return prev;

                if (tilePos.y === curr.begin.y) {
                    if (tilePos.x >= curr.begin.x && tilePos.x < curr.begin.x + curr.text.length) {
                        return curr.background ? THEME.BACKGROUND : curr.text.charAt(tilePos.x - curr.begin.x);
                    }
                }
                return '';
            }, '');
            if (t) tile = t;
        }
            
        return tile || NON_BREAKING.SPACE;
    });

    const calcHighlighterValue = screen(window, (tilePos, p) => 
            tilePos.x === p.x && tilePos.y === p.y ? THEME.BACKGROUND : NON_BREAKING.SPACE);

    const calcHotkeysValue = screen(window, (tilePos: Coord, texts: Button[], filter:string[]) => {
        let tile;
        if (texts) {
            const t = texts.reduce((prev, curr) => {
                if (prev) return prev;

                if (tilePos.y === curr.begin.y) {
                    const char = curr.text.charAt(tilePos.x - curr.begin.x);
                    if (tilePos.x >= curr.begin.x && tilePos.x < curr.begin.x + curr.text.length && filter.includes(char.toLowerCase())) {
                        return curr.background ? THEME.BACKGROUND : char;
                    }
                }
                return '';
            }, '');
            if (t) tile = t;
        }
        return tile || NON_BREAKING.SPACE;
    });

    const calcInputValue = screen(window, (tilePos, p) => 
        tilePos.x === p.x && tilePos.y === p.y ? THEME.USER : NON_BREAKING.SPACE);

    return (
        <div className="container">
            <CommonLayer
                value={calcLayerValue(
                    [{  top: y, left: x, right: x + width, bottom: y + height }], 
                    [
                        title ? { begin: { x: 2, y: 0 }, text: parseText(title)} : {},
                        text ? { begin: { x: 14, y: 2 }, text: parseText(text)} : {}
                    ])} 
                style={{ backgroundColor: '#00BFF0' }}
                width={width}
                height={height}
            />
            <CommonLayer
                value={calcLayerValue(
                    null,
                    rest.map((b: Button) => ({ ...b, background: true }))
                )} 
                style={{ color: 'red', backgroundColor: 'transparent' }}
                width={width}
                height={height}
            />
            {selected &&
                <CommonLayer
                    value={calcLayerValue(
                        null,
                        [{ ...selected, background: true }]
                    )} 
                    style={{ color: 'green', backgroundColor: 'transparent' }}
                    width={width}
                    height={height}
                />
            }
            <CommonLayer
                value={calcLayerValue(
                    null,
                    parsedButtons
                )} 
                style={{ color: 'white', backgroundColor: 'transparent' }}
                width={width}
                height={height}
            />
            <CommonLayer
                value={calcHighlighterValue(pos)} 
                style={{ color: 'black', backgroundColor: 'transparent' }}
                width={width}
                height={height}
            />
            <CommonLayer
                value={calcHotkeysValue(parsedButtons, HOTKEYS)} 
                style={{ color: 'grey', backgroundColor: 'transparent' }}
                width={width}
                height={height}
            />
            <InputLayer
                onKeyDown={handleKeyDown}
                value={calcInputValue(pos)}
                width={width}
                height={height}
            /> 
        </div>
    );
};