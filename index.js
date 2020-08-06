import React from "react";
import ReactDOM from "react-dom";

import { parseText } from './src/helpers';
import UI from "./src/index.jsx";


// Controller creators
const createButton = (begin, text) => ({
    action: () => window.alert(`Button ${text}`),
    begin,
    text: parseText(`[ ${text} ]`)
});

const MainWindow = {
    text: 'Welcome to textarea-ui, a retro inspired text UI for your favourite browser.',
    title: 'textarea-ui',
    width: 100,
    height: 25,
};

const HotLineMiami = {
    buttons: [createButton({ x: 20, y: 5 }, 'Yes'), createButton({ x: 35, y: 5 }, 'No')],
    text: 'Do you like hurting other people?',
    title: 'HOT LINE MAIAMEE',
    
    x: 0,
    y: 0, 
    width: 60, 
    height: 8 
};

ReactDOM.render(
    <UI window={HotLineMiami} />,
    document.getElementById('root')
);

module.hot.accept();