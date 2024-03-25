import * as React from 'react';

import Screen from "../lib/Screen";
import { getTextValue } from './util/get-values';

export default () => {
    const props = {
        color: {
            background: 'aliceblue',
            characters: 'blueviolet'
        },
        grid: true,
        free: true,
        highlight: true,
        windows: [
            {
                bounds: {
                    top: 2,
                    left: 10,
                    right: 90,
                    bottom: 11
                },
                color: {
                    foreground: {
                        background: '#ff3320',
                        characters: 'white'
                    }
                },
                text: getTextValue('center', { x: 0, y: 4 }, "I'm right in the center dude!"),
                title: getTextValue('center', { x: 0 }, "[Upper red&white]"),
            },
            {
                bounds: {
                    top: 13,
                    left: 10,
                    right: 90,
                    bottom: 20
                },
                color: {
                    foreground: {
                        background: 'lightgreen',
                        characters: 'blue'
                    }
                },
                text: getTextValue('left', { x: 3, y: 3 }, "I'm right in the left dude!"),
                title: getTextValue('right', { x: 5 }, "[Middle lightgreen&blue]"),
            },
            {
                bounds: {
                    top: 23,
                    left: 10,
                    right: 90,
                    bottom: 28
                },
                color: {
                    foreground: {
                        background: 'cyan',
                        characters: 'magenta'
                    }
                },
                text: getTextValue('right', { x: 3, y: 2 }, "I'm right in the right dude!"),
                title: getTextValue('left', { x: 5 }, "[Lower cyan&magenta]"),
            }
        ],
        size: {
            width: 100,
            height: 30
        }
    };

    return <Screen { ...props } />;
};