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
        RAIN: string;
        SHADOW: string;
    }
    USER: string;
}

// Components (new)
export type Aligment = 'left' | 'center' | 'right';
export type Margin = number | Coord;
export interface Text {
    align: Aligment;
    margin: Margin;
    value: string;
}
export interface Window {
    bounds: Box;
    color: string;
    title: Text;
    text: Text;
}

// Primitives
export interface Box {
    top: number;
    left: number;
    bottom: number;
    right: number;
}

// Values
export interface StringValue {
    begin: Coord;
    background?: boolean;
    text: string;
}

export interface WindowValue {
    pos: Coord;
    color: string;
    texts: StringValue[];
    size: Size;
};

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