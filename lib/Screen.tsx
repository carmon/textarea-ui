import * as React from 'react';
import { Fragment, useState } from 'react';

import CommonLayer from './layer/common';
import InputLayer from './layer/input';
import WindowComponent from './components/window';

// const isFFX = navigator.userAgent.indexOf("Firefox") != -1;
// const widthOffset = isFFX ? 1 : 0;
const widthOffset = 1;
const fontSize = '20px';

import {
    TEXT, 
    THEME,
    // ACTION, PREV, NEXT,
} from './defaults/values';

import { 
    Box,
    Size,
    Text,
    StringValue,
    Window,
    WindowValue,
    ScreenColor
} from './types';

import { 
    // checkButtonFocus, 
    getButtonPos,
    parseButtonText,
    parseText,
    screen, 
    NON_BREAKING 
} from './util';
import { getScreenColor, getWindowColor } from './defaults/utils';

interface PropTypes {
    color?: Partial<ScreenColor>;
    free?: boolean;
    grid?: boolean;
    highlight?: boolean;
    selected?: number;
    size: Size;
    windows: Window[];
}

const getInitialPos = (w: Window) => {
    if (!w.buttons) return { x: 0, y: 0 };
    const btnPos = getButtonPos(w.buttons[0]);
    return {
        x: w.bounds.left + btnPos.x,
        y: w.bounds.top + btnPos.y - 2,
    }
};

export default ({
    color,
    grid = false,
    highlight = false,
    selected = -1,
    size, 
    windows 
}: PropTypes) => {
    const c = getScreenColor(color);
    const [pos, setPos] = useState(selected < 0 ? { x: 0, y: 0 } : getInitialPos(windows[selected]));
    
    const handleKeyEvent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault();

        const dir = { x: 0, y: 0 };
        if (e.key.includes('Arrow')) {
            const key = e.key.replace('Arrow', '');
            switch (key) {
                case 'Left':
                    dir.x -= 1;
                    break;
                case 'Right':
                    dir.x += 1;
                    break;
                case 'Up':
                    dir.y -= 1;
                    break;
                case 'Down':
                    dir.y += 1;
                    break;
            }
            const target = { x: pos.x + dir.x, y: pos.y + dir.y };

            if (target.x < 0)
                target.x = size.width;
            else if (target.x > size.width)
                target.x = 0;

            if (target.y < 0)
                target.y = size.height - 1;
            else if (target.y === size.height)
                target.y = 0;

            setPos(target);
        }
    };

    const calcForegroundValue = screen(size, tilePos => {
        if (grid) {
            if (tilePos.y === 0) 
                return (tilePos.x % 10).toString();
            
            if (tilePos.x === 0)
                return (tilePos.y % 10).toString();
        }
        return NON_BREAKING.SPACE;
    });

    const calcTitleValue = (b: Box) => (value: Text | string): StringValue => {
        const t = typeof(value) === 'string' ? { ...TEXT, value: parseText(value)} : value;
        const m = typeof(t.margin) === 'number' ? { x: t.margin, y: t.margin } : t.margin;
        return {
            begin: {
                x: t.align === 'left' 
                    ? m.x + 1
                    : t.align === 'center' 
                        ? (b.right - b.left - t.value.length) / 2 
                        : b.right - b.left - m.x - t.value.length,
                y: 0,
            },
            text: parseText(t.value)
        };
    };
            
    const calcTextValue = (b: Box) => (value: Text | string): StringValue[] => {
        const t = typeof(value) === 'string' ? { ...TEXT, value } : value;
        const m = typeof(t.margin) === 'number' ? { x: t.margin, y: t.margin } : t.margin;
        const maxLineLen = b.right - b.left - m.x * 2 - 2;        
        const res = t.value
            .split('\n') // Look for manual wrapping
            .reduce(
                (prev: string[], curr) => {
                    if (curr.length > maxLineLen) {
                        const m = Math.ceil(curr.length / maxLineLen);
                        const lines = new Array(m).fill('').map((_, i) => t.value.substring(i * maxLineLen, i * maxLineLen + maxLineLen));
                        return [...prev, ...lines];
                    }
                    return [...prev, curr];
                },
                []
            );

        return res.map((text, i) => {
            return {
                begin: {
                    x: t.align === 'left' 
                        ? m.x + 1
                        : t.align === 'center' 
                            ? ((b.right - b.left) - text.length) / 2
                            : b.right - b.left - m.x - t.value.length,
                    y: i + m.y,
                },
                text: parseText(text).trim()
            };
        });
    };

    const parsedWindows: WindowValue[] = windows.map(w => ({
        color: getWindowColor(w.color),
        pos: {
            x: w.bounds.left,
            y: w.bounds.top
        },
        texts: [
            calcTitleValue(w.bounds)(w.title),
            ...(w.text ? calcTextValue(w.bounds)(w.text) : []),
            ...(w.texts ? w.texts.map(calcTextValue(w.bounds)).reduce((p, c) => [...p, ...c], []) : []),
        ],
        size: { width: w.bounds.right - w.bounds.left, height: w.bounds.bottom - w.bounds.top },
    }));
    
    const calcHighlighterValue = screen(size, (tilePos, p) => 
            tilePos.x === p.x && tilePos.y === p.y ? THEME.BACKGROUND : NON_BREAKING.SPACE);    

    const calcInputValue = screen(size, (tilePos, p) => 
        tilePos.x === p.x && tilePos.y === p.y ? THEME.USER : NON_BREAKING.SPACE);

    const { width, height } = size;
    return (
        <Fragment>
            <CommonLayer
                value={calcForegroundValue()} 
                style={{ 
                    backgroundColor: c.background, 
                    color: c.characters, 
                    fontSize 
                }}
                width={width + widthOffset}
                height={height}
            />
            {parsedWindows.map((w, it) => 
                <WindowComponent 
                    key={it} 
                    buttons={windows[it].buttons?.map(parseButtonText) || []}
                    fontSize={fontSize}
                    selected={selected === it}
                    pos={pos}
                    setPos={(x, y) => setPos({x, y})}
                    value={w}
                    width={w.size.width + widthOffset}
                />)}
            {highlight && 
                <CommonLayer
                    value={calcHighlighterValue(pos)} 
                    style={{ 
                        color: c.highlighter, 
                        backgroundColor: 'transparent', 
                        fontSize 
                    }}
                    width={width + widthOffset}
                    height={height}
                />}
            {selected < 0 && 
                <InputLayer
                    onKeyUp={handleKeyEvent}
                    style={{ fontSize }}
                    value={calcInputValue(pos)}
                    width={width + widthOffset}
                    height={height}
                />}
        </Fragment>
    );
};
