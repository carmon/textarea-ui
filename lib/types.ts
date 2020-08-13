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
    x: number;
    y: number;
    buttons: Button[];
    text: string;
    title:string;
}

export interface Box {
    top: number;
    left: number;
    bottom: number;
    right: number;
}

export interface Button {
    action: () => void;
    background?: boolean; // This is calculated
    begin: Coord;
    hotkey: string; // This is calculated
    text: string;
}

// Core
export type Mapper<T> = (c: Coord, ...r:T[]) => string;

export interface Coord {
    x: number;
    y: number;
}