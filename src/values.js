import { TILES } from './config';

// General textarea value parser
export const calcLayerValue = ({ width, height }, boxes, texts) => 
    new Array(height).fill(0).map((_, i) => 
        new Array(width).fill(0).map((_,j) => {
            let tile;
            if (boxes) {
                const t = boxes.reduce((prev, curr) => {
                    if (prev) return prev;

                    if (i === curr.top) {
                        if (j === curr.left)
                            return TILES.DOUBLE_SINGLE.TOP_LEFT;
                        if (j === curr.right - 1)
                            return TILES.DOUBLE_SINGLE.TOP_RIGHT;
                        if (j > curr.left && j < curr.right - 1)
                            return TILES.DOUBLE_SINGLE.HOR;
                    }

                    if (i === curr.bottom - 1) {
                        if (j === curr.left)
                            return TILES.DOUBLE_SINGLE.BOTTOM_LEFT;
                        if (j === curr.right - 1)
                            return TILES.DOUBLE_SINGLE.BOTTOM_RIGHT;
                        if (j > curr.left && j < curr.right - 1)
                            return TILES.DOUBLE_SINGLE.HOR;
                    } 
                    if ((j === curr.left || j === curr.right - 1) && i > curr.top && i < curr.bottom)
                        return TILES.DOUBLE_SINGLE.VER;
                    
                    return '';
                }, '');
                if (t) tile = t;
            }

            if (texts) {
                const t = texts.reduce((prev, curr) => {
                    if (prev) return prev;

                    if (i === curr.begin.y) {
                        if (j >= curr.begin.x && j < curr.begin.x + curr.text.length) {
                            return curr.background ? TILES.BUTTON_BACKGROUND : curr.text.charAt(j - curr.begin.x);
                        }
                    }
                    return '';
                }, '');
                if (t) tile = t;
            }
            
            return tile || TILES.NON_BREAKING_SPACE;
        }).join('')
    ).join('');
