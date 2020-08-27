import React, { useState } from "react";
import ReactDOM from "react-dom";

import Screen from "./lib/index.tsx";

import './style.css';

const HotlineMaiame = () => {
    const props = {
        buttons: [],
        windows: [
            {
                bounds: {
                    top: 5,
                    left: 10,
                    right: 90,
                    bottom: 20
                },
                text: {
                    align: 'center',
                    margin: { x: 1, y: 2 },
                    value: "I'm right in the center dude!"
                },
                title: {
                    align: 'center',
                    margin: { x: 0 },
                    value: "[Scene test]"
                },
            }
        ],
        size: {
            width: 100,
            height: 35 
        }
    };

    return <Screen { ...props } />;
};


ReactDOM.render(
    <HotlineMaiame />,
    document.getElementById('root')
);

module.hot.accept();