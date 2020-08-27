import * as React from 'react';
import { Fragment, useState } from 'react';

import CommonLayer from './layer/common';
import InputLayer from './layer/input';

const isChrome = navigator.userAgent.indexOf("Chrome") != -1;
const notWindows = navigator.appVersion.indexOf("Win") == -1;
const correctOffset = (width: number) => notWindows && isChrome ? width + 1 : width;

import {
    TEXT, 
    THEME,
    ACTION, PREV, NEXT,
    DIR, LEFT, RIGHT, DOWN, UP
} from './defaults';

import { 
    Box, 
    Button, 
    Mapper,
    Coord, 
    Size, 
    Text,
    StringValue,
    Window
} from './types';
import { checkButtonFocus, getButtonPos, parseText, NON_BREAKING } from './util';

const screen = ({ width, height }: Size, func: Mapper<any>) => (...args:any[]) =>
    new Array(height).fill(0).map((_, y) => 
        new Array(width).fill(0).map((_,x) => 
            func({ x , y }, ...args)
        ).join('')
    ).join('');

interface PropTypes {
    buttons: Button[];
    forced?: boolean;
    highlight?: boolean;
    size: Size;
    windows: Window[];
}

export default ({ forced = false, highlight = false, buttons, size, windows }: PropTypes) => {
    const { bounds } = windows[0];
    const { width, height } = size;

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
    
    const [i, setI] = useState(0);

    const initialPos = forced && parsedButtons.length ? getButtonPos(parsedButtons[i] || parsedButtons[0]) : { x: 0, y: 0 };
    const [pos, setPos] = useState(initialPos);
    // Fixes buttons changing
    // if (forced && pos.x !== initialPos.x || pos.y !== initialPos.y)
    //     setPos(initialPos);
    
    // Only one is marked selected
    const [selected, ...rest] = parsedButtons.sort((a, b) => 
        checkButtonFocus(pos, a) ? -1 : checkButtonFocus(pos, b) ? 1 : 0);
    
    const handleKeyEvent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault();

        if (ACTION.includes(e.keyCode) && selected) {
            selected.action();
        }

        const k = e.key.toLowerCase();
        if (HOTKEYS.includes(k)) {
            buttons.filter(b => b.hotkey === k)[0].action();
        }

        if (forced) {
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

    const calcForegroundValue = screen(size, (tilePos) => {
        if (tilePos.y === 0) 
            return (tilePos.x % 10).toString();
        
        if (tilePos.x === 0)
            return (tilePos.y % 10).toString();

        return NON_BREAKING.SPACE;
    });

    const calcTitleValue = (b: Box) => (value: Text | string): StringValue => {
        const t = typeof(value) === 'string' ? { ...TEXT, value: parseText(value)} : value;
        const m = typeof(t.margin) === 'number' ? { x: t.margin, y: t.margin } : t.margin;
        return {
            begin: {
                x: t.align === 'left' 
                    ? m.x
                    : t.align === 'center' 
                        ? (b.right - b.left - t.value.length) / 2 
                        : b.right - b.left - m.x - t.value.length,
                y: 0,
            },
            text: parseText(t.value)
        };
    };
            
    const calcTextValue = (b: Box) => (value: Text | string): StringValue[] => {
        const t = typeof(value) === 'string' ? { ...TEXT, value: parseText(value)} : value;
        const m = typeof(t.margin) === 'number' ? { x: t.margin, y: t.margin } : t.margin;

        const len = t.value.length;
        const maxLineLen = b.right - m.x * 2;
        const res = t.value.split('\n');
        
        return res.map((text, i) => {
            console.log(t.value.substr(maxLineLen * i, maxLineLen));
            return {
                begin: {
                    x: t.align === 'left' 
                        ? m.x 
                        : t.align === 'center' 
                            ? ((b.right - b.left) - text.length) / 2
                            : b.right - b.left - m.x - len,
                    y: i + m.y,
                },
                text: parseText(text).trim()
            };
        });
    };

    const calcWindowValue = screen(
        { width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }, 
        (tilePos, { bounds: b, text, title }: Window) => {
            const w = b.right - b.left;
            const h = b.bottom - b.top;
            
            
            const calcTitle = calcTitleValue(b);
            const tit = calcTitle(title);
            console.log(tit);

            //console.log(tilePos.y, tit.begin.y);
            if (tilePos.y === tit.begin.y) {
                if (tilePos.x >= tit.begin.x && tilePos.x < tit.begin.x + tit.text.length) {
                    return tit.background ? THEME.BACKGROUND : tit.text.charAt(tilePos.x - tit.begin.x);
                }
            }

            if (tilePos.y === 0) {
                if (tilePos.x === 0)
                    return THEME.DOUBLE_SINGLE.TOP_LEFT;
                if (tilePos.x === w - 1)
                    return THEME.DOUBLE_SINGLE.TOP_RIGHT;
                if (tilePos.x > 0 && tilePos.x < w - 1)
                    return THEME.DOUBLE_SINGLE.HOR;
            }

            if (tilePos.y === h - 1) {
                if (tilePos.x === 0)
                    return THEME.DOUBLE_SINGLE.BOTTOM_LEFT;
                if (tilePos.x === w - 1)
                    return THEME.DOUBLE_SINGLE.BOTTOM_RIGHT;
                if (tilePos.x > 0 && tilePos.x < w - 1)
                    return THEME.DOUBLE_SINGLE.HOR;
            } 
            if ((tilePos.x === 0 || tilePos.x === w - 1) && tilePos.y > 0 && tilePos.y < h)
                return THEME.DOUBLE_SINGLE.VER;
                

            const calcText = calcTextValue(b);
            const texts = calcText(text);

            if (texts) {
                const t = texts.filter(t => !!t).reduce((prev, curr) => {
                    if (prev) return prev;
    
                    if (tilePos.y === curr.begin.y) {
                        if (tilePos.x >= curr.begin.x && tilePos.x < curr.begin.x + curr.text.length) {
                            return curr.background ? THEME.BACKGROUND : curr.text.charAt(tilePos.x - curr.begin.x);
                        }
                    }
                    return '';
                }, '');
                if (t) return t;
            }

            return NON_BREAKING.SPACE;
        }
    );

    const calcLayerValue = screen(size, (tilePos: Coord, boxes: Box[], texts: Button[]) => {
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
            const t = texts.filter(t => !!t).reduce((prev, curr) => {
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

    const calcHighlighterValue = screen(size, (tilePos, p) => 
            tilePos.x === p.x && tilePos.y === p.y ? THEME.BACKGROUND : NON_BREAKING.SPACE);

    const calcHotkeysValue = screen(size, (tilePos: Coord, texts: Button[], filter:string[]) => {
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

    const calcInputValue = screen(size, (tilePos, p) => 
        tilePos.x === p.x && tilePos.y === p.y ? THEME.USER : NON_BREAKING.SPACE);
    
    return (
        <Fragment>
            <CommonLayer
                value={calcForegroundValue()} 
                style={{ backgroundColor: '#0000AA', color: 'cyan' }}
                width={correctOffset(width)}
                height={height}
            />
            <CommonLayer
                value={calcWindowValue(windows[0])} 
                style={{ 
                    backgroundColor: 'gray', 
                    color: 'white', 
                    top: `${windows[0].bounds.top}em`,
                    left: `${windows[0].bounds.left * .6125}em`,
                }}
                width={correctOffset(windows[0].bounds.right - windows[0].bounds.left)}
                height={windows[0].bounds.bottom - windows[0].bounds.top}
            />
            {rest.length > 0 && 
                <CommonLayer
                    value={calcLayerValue(
                        null,
                        rest.map((b: Button) => ({ ...b, background: true }))
                    )} 
                    style={{ color: 'red', backgroundColor: 'transparent' }}
                    width={correctOffset(width)}
                    height={height}
                />}
            {selected &&
                <CommonLayer
                    value={calcLayerValue(
                        null,
                        [{ ...selected, background: true }]
                    )} 
                    style={{ color: 'green', backgroundColor: 'transparent' }}
                    width={correctOffset(width)}
                    height={height}
                />}
            {parsedButtons.length > 0 && 
                <CommonLayer
                    value={calcLayerValue(
                        null,
                        parsedButtons
                    )} 
                    style={{ color: 'white', backgroundColor: 'transparent' }}
                    width={correctOffset(width)}
                    height={height}
                />}
            {highlight && 
                <CommonLayer
                    value={calcHighlighterValue(pos)} 
                    style={{ color: 'black', backgroundColor: 'transparent' }}
                    width={correctOffset(width)}
                    height={height}
                />}
            {parsedButtons.length > 0 &&
                <CommonLayer
                    value={calcHotkeysValue(parsedButtons, HOTKEYS)} 
                    style={{ color: 'grey', backgroundColor: 'transparent' }}
                    width={correctOffset(width)}
                    height={height}
                />}
            <InputLayer
                onKeyUp={handleKeyEvent}
                value={calcInputValue(pos)}
                width={correctOffset(width)}
                height={height}
            /> 
        </Fragment>
    );
};