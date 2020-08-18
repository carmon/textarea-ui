// Aesthetics
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
type Aligment = 'left' | 'center' | 'right';
type Margin = number | Coord;
export interface Text {
    align: Aligment;
    margin: Margin;
    value: string;
}

// Primitives
export interface Box {
    top: number;
    left: number;
    bottom: number;
    right: number;
}

export interface StringValue {
    begin: Coord;
    background?: boolean;
    text: string;
}

// Components (older)
export interface Button {
    action: () => void;
    background?: boolean; // This is calculated
    begin: Coord;
    hotkey: string; // This is calculated
    text: string;
}

// Core
export type Mapper<T> = (c: Coord, ...r:T[]) => string;

// Geom
export interface Coord {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}