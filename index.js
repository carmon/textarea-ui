import React, { useState } from "react";
import ReactDOM from "react-dom";

import UI from "./lib/index.tsx";


const HotlineMaiame = () => {
    const HotLineMiami = {
        buttons: [],
        text: 'Align me, dude',
        title: 'ui-textarea alignment feature',
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