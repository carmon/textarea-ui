import React, { useState } from "react";
import ReactDOM from "react-dom";

import Screen from "./lib/index.tsx";

import './style.css';

const HotlineMaiame = () => {
    const props = {
        highlight: true,
        windows: [
            {
                bounds: {
                    top: 2,
                    left: 10,
                    right: 90,
                    bottom: 28
                },
                color: 'cyan',
                text: {
                    align: 'center',
                    margin: { x: 0, y: 20 },
                    value:  "This site is currently under construction! (ǒ Ɔ ǒ)"
                },
                title: {
                    align: 'center',
                    margin: { x: 0 },
                    value: "[Welcome to carmon.dev]"
                },
            }
        ],
        size: {
            width: 100,
            height: 30
        }
    };

    return <Screen { ...props } />;
};


ReactDOM.render(
    <HotlineMaiame />,
    document.getElementById('root')
);

module.hot.accept();