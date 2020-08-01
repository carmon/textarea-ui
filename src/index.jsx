import React, { Component } from "react";

import './style.css';

// Detects Firefox 1.0+
const isFirefox = typeof InstallTrigger !== 'undefined';

// UI
const TILES = {
    DOUBLE_SINGLE: {
        HOR: '═',
        VER: '│',
        TOP_LEFT: '╒',
        TOP_RIGHT: '╕',
        BOTTOM_LEFT: '╘',
        BOTTOM_RIGHT: '╛'
    },
    NON_BREAKING_SPACE: '\xa0',
    USER: '▓'
};

const TILES_W = 100;
const TILES_H = 30;

const calculateValue = (cursor, boxes, texts) => {
    const v = new Array(TILES_H).fill(0).map((_, i) => {              
        return new Array(TILES_W).fill(0).map((_,j) => {
            if (cursor) {
                if (j === cursor.x && i === cursor.y)
                    return TILES.USER;
            }

            if (boxes) {
                const tile = boxes.reduce((prev, curr) => {
                    if (prev) return prev;

                    if (i === curr.top) {
                        if (j === curr.left)
                            return TILES.DOUBLE_SINGLE.TOP_LEFT;
                        if (j === curr.right)
                            return TILES.DOUBLE_SINGLE.TOP_RIGHT;
                        if (j > curr.left && j < curr.right)
                            return TILES.DOUBLE_SINGLE.HOR;
                    }

                    if (i === curr.bottom) {
                        if (j === curr.left)
                            return TILES.DOUBLE_SINGLE.BOTTOM_LEFT;
                        if (j === curr.right)
                            return TILES.DOUBLE_SINGLE.BOTTOM_RIGHT;
                        if (j > curr.left && j < curr.right)
                            return TILES.DOUBLE_SINGLE.HOR;
                    } 
                    if ((j === curr.left || j === curr.right) && i > curr.top && i < curr.bottom)
                        return TILES.DOUBLE_SINGLE.VER;
                    
                    return '';
                }, '');
                if (tile) return tile;
            }

            if (texts) {
                const tile = texts.reduce((prev, curr) => {
                    if (prev) return prev;

                    if (i === curr.begin.y) {
                        if (j >= curr.begin.x && j < curr.begin.x + curr.text.length) {
                            return curr.background ? TILES.USER : curr.text.charAt(j - curr.begin.x);
                        }
                    }
                    return '';
                }, '');
                if (tile) return tile;
            }

            // if (i === 0) {
            //     if (j === 0)
            //         return TILES.DOUBLE_SINGLE.TOP_LEFT;
            //     if (j === TILES_W - 1)
            //         return TILES.DOUBLE_SINGLE.TOP_RIGHT;
            //     return TILES.DOUBLE_SINGLE.HOR;
            // }
            
            // if (i === TILES_H - 1) {
            //     if (j === 0)
            //         return TILES.DOUBLE_SINGLE.BOTTOM_LEFT;
            //     if (j === TILES_W - 1)
            //         return TILES.DOUBLE_SINGLE.BOTTOM_RIGHT;
            //     return TILES.DOUBLE_SINGLE.HOR;
            // }            
            
            // if (j === 0 || j === TILES_W - 1)
            //     return TILES.DOUBLE_SINGLE.VER;
            
            return TILES.NON_BREAKING_SPACE;
        });
    }).join().replace(/,/gi, '');
    return v;
}

// MOVEMENT
const DIR = [
    37, 65, // LEFT
    38, 87, // UP
    39, 68, // RIGHT
    40, 83  // DOWN
];
const LEFT  = 0;
const UP    = 1;
const RIGHT = 2;
const DOWN  = 3;

export default class UI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            x: 0,
            y: 0
        };

        this.handleBlur = this.handleBlur.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.handleInputRef = ref => {
            this.input = ref;
        }
    }

    handleBlur(_) {
        this.input.focus();
    }

    handleKeyDown(e) {
        let dir = { x: 0, y: 0 };
        if (DIR.includes(e.keyCode)) {
            const i = DIR.indexOf(e.keyCode);
            const mod = (i % 2 ? i - 1 : i) / 2;
            switch (mod) {
                case LEFT:
                    dir.x -= 1;
                    break;
                case RIGHT:
                    dir.x += 1;
                    break;
                case UP:
                    dir.y -= 1;
                    break;
                case DOWN:
                    dir.y += 1;
                    break;
            }
            this.setState({
                x: Math.max(0, this.state.x + dir.x),
                y: Math.max(0, this.state.y + dir.y)
            });
        }
    }

    render () {
        const { x, y } = this.state;
        const button = {
            begin: { x: 10, y: 3 },
            text: `Button${TILES.NON_BREAKING_SPACE}Example`,
        };
        return (
            <div className="container">
                <textarea 
                    className="layer"
                    cols={isFirefox ? TILES_W : TILES_W-1} 
                    rows={TILES_H}
                    value={calculateValue({ x, y }, 
                        [
                            {  top: 0, left: 0, right: TILES_W - 1, bottom: TILES_H - 1 },
                            {  top: 5, left: 10, right: 40, bottom: 20 }
                        ])} 
                    style={{ backgroundColor: 'cyan' }}
                    // disabled
                    readOnly
                />
                <textarea 
                    className="layer"
                    cols={isFirefox ? TILES_W : TILES_W-1} 
                    rows={TILES_H}
                    value={calculateValue(null,
                        [
                            // {  top: 2, left: 5, right: 70, bottom: 25 }
                        ],
                        [
                            { ...button, background: true }
                        ])} 
                    style={{ color: 'red', backgroundColor: 'transparent' }}
                    // disabled
                    readOnly
                />
                <textarea 
                    className="layer"
                    cols={isFirefox ? TILES_W : TILES_W-1} 
                    rows={TILES_H}
                    value={calculateValue(null,
                        [
                            // {  top: 2, left: 5, right: 70, bottom: 25 }
                        ],
                        [
                            button
                        ])} 
                    style={{ color: 'white', backgroundColor: 'transparent' }}
                    wrap="soft"
                    // disabled
                    readOnly
                />
               <textarea 
                    autoFocus 
                    className="input"
                    onKeyDown={this.handleKeyDown}
                    onBlur={this.handleBlur}
                    ref={this.handleInputRef}
                />
            </div>
        );
    }
}