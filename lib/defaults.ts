import { ColorTheme, Text, Theme } from './types'; 

export const COLOR_THEME: ColorTheme = {
    foreground: {
        background: 'gray',
        characters: 'blue'
    },
    window: {
        foreground: {
            background: 'cyan',
            characters: 'black'
        },
        buttons: {
            background: 'red',
            characters: 'white'
        },
        hotkeys: 'yellow'
    },
    highlighter: 'black'
};

export const THEME: Theme = {
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
        RAIN: '░',
        SHADOW: '▓',
    },
    USER: '_'
};

export const TEXT: Text = {
    align: 'left',
    margin: 1,
    value: ''
};

// KEY CODES

// ACTION
export const ACTION = [
    13, // ENTER
    32  // SPACEBAR
];

export const CLOSE = [
    27 // ESCAPE
];

// FORCE MODE
export const NEXT = [ 
    9, // TAB
    39, // RIGHT
    40 // DOWN
];

export const PREV = [
    37, // LEFT
    38 // UP
];

// MOVEMENT
export const DIR = [
    37, 65, // LEFT
    38, 87, // UP
    39, 68, // RIGHT
    40, 83  // DOWN
];
export const LEFT  = 0;
export const UP    = 1;
export const RIGHT = 2;
export const DOWN  = 3;