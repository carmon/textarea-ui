import { ScreenColor, WindowColor, WindowColorValue } from "../types";
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