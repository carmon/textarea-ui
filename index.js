import React from "react";
import ReactDOM from "react-dom";

import UI from "./lib/index.tsx";

// Controller creators
const createButton = (begin, text) => ({
    action: () => window.alert(`Button ${text}`),
    begin,
    text,
});

const textState = {
    default: 'Do you like hurting other people?',
    yes: 'Check out this game then.',
    no: 'In some videogames, you can hurt people without taking the consecuences.'
};

const get = () => textState[0];

const HotLineMiami = {
    buttons: [createButton({ x: 20, y: 5 }, 'Yes'), createButton({ x: 35, y: 5 }, 'No')],
    text: 'Do you like hurting other people?',
    title: 'Hotline  Maiamee',
    x: 0,
    y: 0, 
    width: 60, 
    height: 8 
};

ReactDOM.render(
    <UI window={HotLineMiami} forceMode />,
    document.getElementById('root')
);

module.hot.accept();