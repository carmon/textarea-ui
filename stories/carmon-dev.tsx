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
                text: getTextValue('center', { x: 0, y: 3 }, "This site is currently under construction, \n you can visit my little projects meanwhile: \n \n \n textarea-ui \n \n TIL \n \n rifles \n \n github profile"),
                title: getTextValue('center', { x: 0 }, "[Carmon is a developer certification website]")
            }
        ],
        size: {
            width: 100,
            height: 30
        }
    };

    return <Screen { ...props } />;
};