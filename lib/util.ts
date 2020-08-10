import { Button, Coord, Theme } from './types';

// Default Theme
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
        SHADOW: '▓',
    },
    USER: '_'
};

export const NON_BREAKING = {
    HYPHEN: '\u2011',
    SPACE: '\xa0'
};

// Parsers
export const parseText = (text: string) =>
    text
        .replace(/ /gi, NON_BREAKING.SPACE)
        .replace(/-/gi, NON_BREAKING.HYPHEN);

// Buttons
export const checkButtonFocus = (pos: Coord, button: Button) =>
    pos.y === button.begin.y && pos.x >= button.begin.x && pos.x < button.begin.x + button.text.length;

// Uses hotkey
export const getButtonPos = (button: Button) => ({
    x: button.begin.x + button.text.toLowerCase().indexOf(button.hotkey),
    y: button.begin.y
});