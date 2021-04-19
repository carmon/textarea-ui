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

interface LayerColor {
    background: string;
    characters: string;
}

export interface WindowColor {
    foreground?: Partial<LayerColor>;
    buttons?: Partial<LayerColor>;
    hotkeys?: string;
}

export interface ScreenColor extends LayerColor {
    highlighter: string;
}

// Components (new)
export type Aligment = 'left' | 'center' | 'right';
export type Margin = number | Coord;
export interface Text {
    align: Aligment;
    margin: Margin;
    value: string;
}
export interface Button {
    action: () => void;
    begin: Coord;
    text: string;
}
export interface Window {
    bounds: Box;
    buttons?: Button[];
    color?: Partial<WindowColor>;
    title: Text;
    text?: Text;
    texts?: Text[];
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

export interface WindowColorValue {
    foreground: LayerColor;
    buttons: LayerColor;
    hotkeys: string;
}

export interface WindowValue {
    pos: Coord;
    color: WindowColorValue;
    texts: StringValue[];
    size: Size;
};

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