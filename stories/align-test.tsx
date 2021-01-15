import * as React from 'react';

import Screen from "../lib/index";
import { Aligment, Margin, Text } from "../lib/types";

const getTextValue = (align: string, margin: { x?: number, y?: number}, value: string): Text => ({
    align: align as Aligment,
    margin: margin as Margin,
    value,
});

export default () => {
    const props = {
        grid: true,
        highlight: true,
        windows: [
            {
                bounds: {
                    top: 2,
                    left: 10,
                    right: 90,
                    bottom: 11
                },
                color: 'cyan',
                text: getTextValue('center', { x: 0, y: 4 }, "I'm right in the center dude!"),
                title: getTextValue('center', { x: 0 }, "[Upper]"),
            },
            {
                bounds: {
                    top: 13,
                    left: 10,
                    right: 90,
                    bottom: 20
                },
                color: 'green',
                text: getTextValue('left', { x: 3, y: 3 }, "I'm right in the left dude!"),
                title: getTextValue('right', { x: 5 }, "[Middle]"),
            },
            {
                bounds: {
                    top: 23,
                    left: 10,
                    right: 90,
                    bottom: 28
                },
                color: 'yellow',
                text: getTextValue('right', { x: 3, y: 2 }, "I'm right in the right dude!"),
                title: getTextValue('left', { x: 5 }, "[Lower]"),
            }
        ],
        size: {
            width: 100,
            height: 30
        }
    };

    return <Screen { ...props } />;
};