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
                        begin: { x: 35, y: 7 },
                        text: 'Github'  
                    },
                    {
                        action: getOpenLinkAction('https://www.linkedin.com/in/carmon/'),
                        begin: { x: 34, y: 9 },
                        text: 'LinkedIn'  
                    },
                    {
                        action: getOpenLinkAction('https://til.vercel.app/'),
                        begin: { x: 29, y: 11 },
                        text: 'TIL: personal blog'  
                    },
                    {
                        action: getOpenLinkAction('https://jmod.vercel.app/'),
                        begin: { x: 25, y: 13 },
                        text: 'JMOD: an online JSON editor'  
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
                    getTextValue('center', { x: 0, y: 3 }, "Hello, I'm Emiliano, a programmer from Argentina \n and this is my personal portfolio:"),
                    getTextValue('center', { x: 0, y: 16 }, "[Click] or [← → ↑ ↓] to move and [↵] to activate button, \n highlighted characters are shortcuts.")
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