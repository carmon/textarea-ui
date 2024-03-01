import * as React from 'react';
import { Fragment, useEffect, useState } from 'react';
import { Button, Coord, Mapper, WindowValue } from '../types';
import { /* checkButtonFocus , getButtonPos, */ NON_BREAKING, screen } from '../util';

import CommonLayer from '../layer/common';
import InputLayer from '../layer/input';
import { ACTION, NEXT, PREV, THEME } from '../defaults/values';
import { coordToStylePos } from '../defaults/utils';

interface Props {
    buttons: Button[];
    fontSize?: string;
    value: WindowValue;
    selected: boolean;
    pos: { x: number, y: number };
    setPos: (x: number, y: number) => void;
    width: number;
}

const calcWindow: Mapper<WindowValue> = (tilePos, { size, texts }) => {
    const { width: w, height: h } = size;
    
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

    if (tilePos.y === 0) {
        if (tilePos.x === 0)
            return THEME.DOUBLE_SINGLE.TOP_LEFT;
        if (tilePos.x === w)
            return THEME.DOUBLE_SINGLE.TOP_RIGHT;
        if (tilePos.x > 0 && tilePos.x < w)
            return THEME.DOUBLE_SINGLE.HOR;
    }

    if (tilePos.y === h - 1) {
        if (tilePos.x === 0)
            return THEME.DOUBLE_SINGLE.BOTTOM_LEFT;
        if (tilePos.x === w)
            return THEME.DOUBLE_SINGLE.BOTTOM_RIGHT;
        if (tilePos.x > 0 && tilePos.x < w)
            return THEME.DOUBLE_SINGLE.HOR;
    } 
    if ((tilePos.x === 0 || tilePos.x === w) && tilePos.y > 0 && tilePos.y < h)
        return THEME.DOUBLE_SINGLE.VER;

    return NON_BREAKING.SPACE;
};

const calcButtonsValue: Mapper<any> = (tilePos, texts: Button[], isBackground: boolean) => {
    const t = texts.filter(t => !!t).reduce((prev, curr) => {
        if (prev) return prev;

        if (tilePos.y === curr.begin.y) {
            if (tilePos.x >= curr.begin.x && tilePos.x < curr.begin.x + curr.text.length) {
                return isBackground ? THEME.BACKGROUND : curr.text.charAt(tilePos.x - curr.begin.x);
            }
        }
        return '';
    }, '');
    if (t) return t;

    return NON_BREAKING.SPACE;
};

const calcInputValue: Mapper<Coord> = (tilePos, p: Coord) => 
    tilePos.x === p.x && tilePos.y === p.y ? THEME.USER : NON_BREAKING.SPACE;

const calcHotkeysValue: Mapper<any> = (tilePos, texts: Button[], filter:string[]) => {
    let tile;
    if (texts) {
        const t = texts.reduce((prev, curr, it) => {
            if (prev) return prev;

            if (tilePos.y === curr.begin.y) {
                const char = curr.text.charAt(tilePos.x - curr.begin.x);
                if (tilePos.x >= curr.begin.x && tilePos.x < curr.begin.x + curr.text.length && filter[it].includes(char.toLowerCase())) {
                    return char;
                }
            }
            return '';
        }, '');
        if (t) tile = t;
    }
    return tile || NON_BREAKING.SPACE;
};

const Window = ({ 
    buttons, 
    fontSize, 
    selected,
    value,
    pos, 
    setPos,
    width
}: Props) => {
    const [current, setCurrent] = useState(0);

    const HOTKEYS = buttons.reduce((prev: string[], curr: Button) => {
        const key = curr.text
            .toLowerCase()
            .split('')
            .filter(s => !!s.trim() && s !== '[' && s !== ']')
            .reduce(
                (p, c) => {
                    if (p) return p;
                    if (!prev.includes(c)) return c;
                    return '';
                }, '');

        return [ ...prev, key ];
    }, []);

    const handleKeyEvent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.stopPropagation();

        if (buttons.length) {
            const i = HOTKEYS.indexOf(e.key);
            if (i >= 0) {
                buttons[i].action();
                setCurrent(i);
            }
            
            if (NEXT.includes(e.keyCode))
                setCurrent(current === buttons.length - 1 ? 0 : current + 1);
    
            if (PREV.includes(e.keyCode))
                setCurrent(current === 0 ? buttons.length - 1 : current - 1);

            if (ACTION.includes(e.keyCode))
                buttons[current].action();
        }
    };

    const handleMouseClick = (c: Coord) => {
        // TODO: click should work not just in buttons
        if (!hasButtons) return;
        const yCoord = Math.floor(c.y);
        const posibleBtn = buttons.find(b => b.begin.y === yCoord);
        if (posibleBtn) {
            const buttonLength = posibleBtn.text.length + 4;
            if (c.x >= posibleBtn.begin.x && c.x <= posibleBtn.begin.x + buttonLength) {
                posibleBtn.action();
            }
        }
    };

    const hasButtons = buttons.length > 0;
    useEffect(() => {
        if (!hasButtons) return;
        const btn = buttons[current];
        if (!btn) return;
        let hotkeyOffset = btn.text.indexOf(HOTKEYS[current]);
        if (hotkeyOffset === -1) hotkeyOffset = btn.text.indexOf(HOTKEYS[current].toUpperCase());
        setPos(btn.begin.x + hotkeyOffset, btn.begin.y); 
    }, [current]);

    const defaultStyle = {
        fontSize,
        ...coordToStylePos(value.pos),
    };

    return (
        <Fragment>
            <CommonLayer
                value={screen(value.size, calcWindow)(value)} 
                style={{ 
                    backgroundColor: value.color.foreground.background, 
                    color: value.color.foreground.characters,
                    ...defaultStyle
                }}
                width={width}
                height={value.size.height}
            />
            {hasButtons && 
                <CommonLayer
                    value={screen(value.size, calcButtonsValue)(buttons, true)}
                    style={{ 
                        backgroundColor: 'transparent',
                        color: value.color.buttons.background,
                        ...defaultStyle
                    }}
                    width={width}
                    height={value.size.height}
                />}
            {hasButtons && 
                <CommonLayer
                    value={screen(value.size, calcButtonsValue)(buttons, false)}
                    style={{ 
                        backgroundColor: 'transparent',
                        color: value.color.buttons.characters,
                        ...defaultStyle
                    }}
                    width={width}
                    height={value.size.height}
                />}
            <CommonLayer
                value={screen(value.size, calcHotkeysValue)(buttons, HOTKEYS)} 
                style={{ 
                    backgroundColor: 'transparent',
                    color: value.color.hotkeys,
                    ...defaultStyle
                }}
                width={width}
                height={value.size.height}
            />
            {selected && 
                <InputLayer
                    onKeyUp={handleKeyEvent}
                    onMouseUp={handleMouseClick}
                    style={defaultStyle}
                    value={screen(value.size, calcInputValue)(pos)}
                    width={width}
                    height={value.size.height + 1} // TODO: check this hardcoded value
                />}
        </Fragment>
    );
};

export default Window;
