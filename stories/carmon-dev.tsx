import * as React from 'react';

import Screen from "../lib/index";
import { getTextValue } from './util/get-values';

export default () => {
    const props = {
        highlight: true,
        windows: [
            {
                bounds: {
                    top: 2,
                    left: 10,
                    right: 90,
                    bottom: 28
                },
                color: 'cyan',
                text: getTextValue('center', { x: 0, y: 20 }, "This site is currently under construction! (ǒ . ǒ)"),
                title: getTextValue('center', { x: 0 }, "[Welcome to carmon.dev]")
            }
        ],
        size: {
            width: 100,
            height: 30
        }
    };

    return <Screen { ...props } />;
};