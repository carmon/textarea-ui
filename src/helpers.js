import { TILES } from './config';

// Parsers
export const parseText = text =>
    text
        .replace(/ /gi, TILES.NON_BREAKING_SPACE)
        .replace(/-/gi, TILES.NON_BREAKING_HYPHEN);