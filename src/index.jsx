import React, { Component } from "react";
import { TILES_W, TILES_H } from './config';

import Layer from './layer/index.jsx';

import './style.css';

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
    SHADOW: '▓',
    USER: '█'
};

// General textarea value parser
const calculateValue = (user, boxes, texts) => 
    new Array(TILES_H).fill(0).map((_, i) => 
        new Array(TILES_W).fill(0).map((_,j) => {
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
            
            return TILES.NON_BREAKING_SPACE;
        })
    ).join().replace(/,/gi, '');

const calculateInputValue = (user) =>
    new Array(TILES_H).fill(0).map((_, i) => 
        new Array(TILES_W).fill(0).map((_,j) => {
            if (user) {
                if (j === user.x && i === user.y)
                    return TILES.USER;
            }
            
            return TILES.NON_BREAKING_SPACE;
        })
    ).join().replace(/,/gi, '');

// Controllers
const createButton = (begin, text) => ({
    begin,
    text: `[ ${text} ]`.replace(/ /gi, TILES.NON_BREAKING_SPACE)
})

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
        const dir = { x: 0, y: 0 };
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
            const pos = { x: this.state.x + dir.x, y: this.state.y + dir.y };
            if (pos.x < 0)
                pos.x = TILES_W - 1;
            else if (pos.x === TILES_W)
                pos.x = 0;

            if (pos.y < 0)
                pos.y = TILES_H - 1;
            else if (pos.y === TILES_H)
                pos.y = 0;

            this.setState(pos);
        }
    }

    render () {
        const { x, y } = this.state;
        const button = createButton({ x: 10, y: 3 }, 'Button Example');
        return (
            <div className="container">
                <Layer 
                    value={calculateValue(null, 
                        [
                            {  top: 0, left: 0, right: TILES_W - 1, bottom: TILES_H - 1 },
                            {  top: 5, left: 10, right: 40, bottom: 20 }
                        ])} 
                    style={{ backgroundColor: 'cyan' }}
                />
                <Layer
                    value={calculateValue(null,
                        null,
                        [{ ...button, background: true }]
                    )} 
                    style={{ color: 'red', backgroundColor: 'transparent' }}
                />
                <Layer
                    value={calculateValue(null,
                        null,
                        [button]
                    )} 
                    style={{ color: 'white', backgroundColor: 'transparent' }}
                />
                <textarea 
                    autoFocus 
                    className="layer"
                    cols={TILES_W} 
                    rows={TILES_H}
                    value={calculateInputValue({ x, y })} 
                    style={{ color: 'green', backgroundColor: 'transparent' }}
                    onKeyDown={this.handleKeyDown}
                    onBlur={this.handleBlur}
                    ref={this.handleInputRef}
                    // This is just to ignore a react error
                    readOnly
                />
            </div>
        );
    }
}