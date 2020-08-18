import React, { useState } from "react";
import ReactDOM from "react-dom";

import UI from "./lib/index.tsx";

// Flagged for migration to TS story
// Will resume example when text wrapping feature is done 
const HotlineMaiame = () => {
    const [text, setText] = useState('Do you like hurting other people?');

    const props = {
        buttons: [
            {
                action: () => {
                    setText('Check out this game then.');
                    window.open('https://www.youtube.com/watch?v=2n_BinoS1Ug', '_blank');
                },
                begin: { x: 20, y: 5 },
                text: 'Yes'  
            },
            {
                action: () => {
                    setText('In some videogames, you can hurt people without taking the consecuences.');
                },
                begin: { x: 35, y: 5 },
                text: 'No'  
            }
        ],
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


ReactDOM.render(
    <HotlineMaiame />,
    document.getElementById('root')
);

module.hot.accept();