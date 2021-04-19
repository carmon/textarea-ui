import * as React from 'react';
// import { useState } from 'react';

// import useInterval from '../lib/helpers/use-interval';
import Screen from "../lib/index";
import { getTextValue } from './util/get-values';

export default () => {
    const title = '[Welcome to textarea ui]';
    const width = 60;
    
    // const [margin, setMargin] = useState(0);
    // useInterval(() => {
    //     setMargin(() => margin < width ? margin + 1 : -title.length);
    // }, 250)

    const props = {
        color: {
            background: 'green',
            highlighter: 'blue'
        },
        windows: [
            {
                bounds: {
                    top: 2,
                    left: 10,
                    right: 10 + width,
                    bottom: 17
                },
                color: {
                    foreground: {
                        background: 'black',
                        characters: 'cyan'
                    }
                },
                buttons: [
                    {
                        action: () => window.open('https://github.com/carmon'),
                        begin: { x: 20, y: 11 },
                        text: 'Go to github repo'  
                    }
                ],
                texts: [
                    getTextValue('center', {x: 0, y: 3}, 'There are currently 4 examples to check\nswitch between them with number keys\n (from [1] to [4]).'),
                    getTextValue('center', {x: 0, y: 7}, 'If you do not come from github,\nuse the button below to check the repo.'),
                ],
                title: getTextValue('left', {x: 0}, title),
            }
        ],
        selected: 0,
        size: {
            width: 80,
            height: 20 
        }
    };

    return <Screen {...props} />;
};