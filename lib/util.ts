import { Button, Coord, Mapper, Size } from './types';

export const NON_BREAKING = {
    HYPHEN: '\u2011',
    SPACE: '\xa0'
};

// Screen (core)
export const screen = ({ width, height }: Size, func: Mapper<any>) => (...args:any[]) =>
    new Array(height + 1).fill(0).map((_, y) => 
        new Array(width + 1).fill(0).map((_,x) => 
            func({ x , y }, ...args)
        ).join('')
    ).join('');

// Parsers
export const parseText = (text: string) =>
    text
        .replace(/ /gi, NON_BREAKING.SPACE)
        .replace(/-/gi, NON_BREAKING.HYPHEN);

export const parseButtonText = (button: Button) => 
    ({ ...button, text: parseText(`[ ${button.text} ]`) });

// Buttons
export const checkButtonFocus = (pos: Coord, button: Button) =>
    pos.y === button.begin.y && pos.x >= button.begin.x && pos.x < button.begin.x + button.text.length;

// Uses hotkey
export const getButtonPos = (button: Button) => ({
    x: button.begin.x,// + button.text.toLowerCase().indexOf(button.hotkey), <= TODO: implement something like this
    y: button.begin.y
});


/*
 const calcLayerValue = screen(screenSize, (tilePos, boxes: Box[], texts: Button[]) => {
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
*/