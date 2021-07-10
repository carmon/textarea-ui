import * as React from 'react';

import Screen from "../lib/index";
import { getTextValue } from './util/get-values';

const getOpenLinkAction = (link: string) => () => window.open(link);

export default () => {
    const props = {
        color: {
            characters: 'gray',
            background: '#073b4c',
            highlighter: 'black'
        },
        highlight: false,
        windows: [
            {
                bounds: {
                    top: 2,
                    left: 5,
                    right: 85,
                    bottom: 23
                },
                buttons: [
                    {
                        action: getOpenLinkAction('https://github.com/carmon'),
                        begin: { x: 35, y: 6 },
                        text: 'Github'  
                    },
                    {
                        action: getOpenLinkAction('https://www.linkedin.com/in/carmon/'),
                        begin: { x: 34, y: 8 },
                        text: 'LinkedIn'  
                    },
                    {
                        action: getOpenLinkAction('https://stackoverflow.com/users/story/3241152'),
                        begin: { x: 31, y: 10 },
                        text: 'stack overflow'  
                    },
                    {
                        action: getOpenLinkAction('https://til.vercel.app/'),
                        begin: { x: 29, y: 12 },
                        text: 'TIL: personal blog'  
                    },
                    {
                        action: getOpenLinkAction('https://www.twitch.tv/carmontv'),
                        begin: { x: 35, y: 14 },
                        text: 'twitch'  
                    }
                ],
                color: {
                    foreground: {
                        background: '#118ab2',
                        characters: '#88fcdd'
                    },
                    buttons: {
                        background: '#f0426b',
                        characters: 'black'
                    },
                    hotkeys: '#ffd166'
                },
                texts: [ 
                    getTextValue('center', { x: 0, y: 3 }, "This site is currently under construction, \n you can visit this links meanwhile:"),
                    getTextValue('center', { x: 0, y: 16 }, "[← → ↑ ↓] to move, [↵] to activate button, \n highlighted characters are shortcuts.")
                ],
                title: getTextValue('center', { x: 0 }, "[Carmon's personal website]")
            }
        ],
        selected: 0,
        size: {
            width: 90,
            height: 25
        }
    };

    return <Screen { ...props } />;
};