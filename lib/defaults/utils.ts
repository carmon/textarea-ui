import { Coord, StylePos, ScreenColor, WindowColor, WindowColorValue } from "../types";
import { COLOR_SCREEN, COLOR_WINDOW } from "./values";

export const getScreenColor = (src?: Partial<ScreenColor>): ScreenColor => ({
  background: src && src.background || COLOR_SCREEN.background,
  characters: src && src.characters || COLOR_SCREEN.characters,
  highlighter: src && src.highlighter || COLOR_SCREEN.highlighter,
});

export const getWindowColor = (src?: Partial<WindowColor>): WindowColorValue => ({
  foreground: {
      background: src && src.foreground && src.foreground.background || COLOR_WINDOW.foreground.background,
      characters: src && src.foreground && src.foreground.characters || COLOR_WINDOW.foreground.characters
  },
  buttons: {
      background: src && src.buttons && src.buttons.background || COLOR_WINDOW.buttons.background,
      characters: src && src.buttons && src.buttons.characters || COLOR_WINDOW.buttons.characters
  },
  hotkeys: src && src.hotkeys || COLOR_WINDOW.hotkeys
});

const yOffset = 1.15;
const xOffset = .6125;

export const coordToStylePos = (coord: Coord): StylePos => ({
  top: `${coord.y * yOffset}em`,
  left: `${coord.x * xOffset}em`,
});

export const stylePosToCoord = (pos: StylePos): Coord => ({
  x: pos.left ? Number(pos.left.split('em')[0]) / xOffset : 0,
  y: pos.top ? Number(pos.top.split('em')[0]) / yOffset : 0,
});

export const pixelToCoord = (coord: Coord): Coord => ({
    x: coord.x / 20 / xOffset,
    y: coord.y / 20 / yOffset,
});