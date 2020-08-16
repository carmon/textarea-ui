import React, { useState } from "react";
import ReactDOM from "react-dom";

import UI from "./lib/index.tsx";

// Flagged for migration to TS story
// Will resume example when text aligment feature is done 
const HotlineMaiame = () => {
    const [text, setText] = useState('Do you like hurting other people?');

    const HotLineMiami = {
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
        text,
        title: 'Hotline  Maiamee',
        x: 0,
        y: 0, 
        width: 60,
        height: 8 
    };

    return <UI window={HotLineMiami} forceMode />;
};


ReactDOM.render(
    <HotlineMaiame />,
    document.getElementById('root')
);

module.hot.accept();