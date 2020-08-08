import { Behaviour, Coord, Theme, Window } from './types';

const THEME: Theme = {
    BACKGROUND: '█',
    DOUBLE_SINGLE: {
        HOR: '═',
        VER: '│',
        TOP_LEFT: '╒',
        TOP_RIGHT: '╕',
        BOTTOM_LEFT: '╘',
        BOTTOM_RIGHT: '╛'
    },
    FX: {
        SHADOW: '▓',
    },
    USER: '_'
};

const NON_BREAKING = {
    HYPHEN: '\u2011',
    SPACE: '\xa0'
};

export const screen = ({ width, height }:Window) => (func:Behaviour) => 
    new Array(height).fill(0).map((_, y) => 
        new Array(width).fill(0).map((_,x) => 
            func({ x , y })
        ).join('')
    ).join('');

// Parsers
export const parseText = (text: string) =>
    text
        .replace(/ /gi, NON_BREAKING.SPACE)
        .replace(/-/gi, NON_BREAKING.HYPHEN);

export const calcHighlighterValue = (
    { height, width }: Window,
    { x, y }: Coord
) => 
    new Array(height).fill(0).map((_, i) => 
        new Array(width).fill(0).map((_,j) => 
            j === x && i === y ? THEME.BACKGROUND : NON_BREAKING.SPACE
        ).join('')
    ).join('');