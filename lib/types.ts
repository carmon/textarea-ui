// Aestetics
export interface Theme {
    BACKGROUND: string;
    DOUBLE_SINGLE: {
        HOR: string;
        VER: string;
        TOP_LEFT: string;
        TOP_RIGHT: string;
        BOTTOM_LEFT: string;
        BOTTOM_RIGHT: string;
    },
    FX: {
        SHADOW: string;
    }
    USER: string;
}

// Components
export interface Window {
    width: number;
    height: number;
}

export interface Button {
    action: () => void;
    begin: Coord;
    hotkey: string; // This is calculated
    text: string;
}

// Core
export type Mapper = (c: Coord) => string;

export interface Coord {
    x: number;
    y: number;
}