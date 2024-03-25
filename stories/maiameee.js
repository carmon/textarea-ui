import React, { useState } from "react";

import UI from "../lib/Screen.tsx";

// Flagged for migration to TS story
// Will resume example when text wrapping feature is done 
export default () => {
    const initialText = 'Do you like hurting other people?';
    const [text, setText] = useState(initialText);

    const backButton = {
        action: () => {
            setText(initialText);
            setButtons(initialButtons);
        },
        begin: { x: 25, y: 5 },
        text: 'Back'
    };

    const initialButtons = [
        {
            action: () => {
                setText('Check out this game then.');
                setButtons([
                    {
                        action: () => {
                            window.open('https://www.youtube.com/watch?v=2n_BinoS1Ug', '_blank');
                        },
                        begin: { x: 20, y: 5 },
                        text: 'Ok'
                    },
                    { ...backButton, begin: { x: 33, y: 5 } }
                ]);
            },
            begin: { x: 20, y: 5 },
            text: 'Yes'  
        },
        {
            action: () => {
                setText('In some videogames, you can hurt people \n without taking the consecuences.');
                setButtons([backButton]);
            },
            begin: { x: 35, y: 5 },
            text: 'No'  
        }
    ];
    const [buttons, setButtons] = useState(initialButtons);

    const props = {
        buttons,
        text: {
            align: 'center',
            margin: { x: 1, y: 2 },
            value: text
        },
        title: 'Hotline  Maiamee',
        begin: {
            x: 0,
            y: 0 
        },
        size: {
            width: 60,
            height: 8 
        },
        forced: true
    };

    return <UI { ...props } />;
};