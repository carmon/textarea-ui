import React, { useState } from "react";
import ReactDOM from "react-dom";

import Screen from "./lib/index.tsx";

import './style.css';

const HotlineMaiame = () => {
    const props = {
        windows: [
            {
                bounds: {
                    top: 5,
                    left: 10,
                    right: 90,
                    bottom: 17
                },
                text: {
                    align: 'center',
                    margin: { x: 0, y: 5 },
                    value:  "I'm right in the center dude!"
                },
                title: {
                    align: 'center',
                    margin: { x: 0 },
                    value: "[Scene test]"
                },
            },
            {
                bounds: {
                    top: 20,
                    left: 10,
                    right: 90,
                    bottom: 25
                },
                text: {
                    align: 'left',
                    margin: { x: 3, y: 2 },
                    value: "I'm right in the left dude!"
                },
                title: {
                    align: 'right',
                    margin: { x: 5 },
                    value: "[Scene test]"
                },
            },
            {
                bounds: {
                    top: 27,
                    left: 10,
                    right: 90,
                    bottom: 30
                },
                text: {
                    align: 'left',
                    margin: { x: 3, y: 2 },
                    value: "I'm right in the left dude!"
                },
                title: {
                    align: 'right',
                    margin: { x: 5 },
                    value: "[Scene test]"
                },
            }
        ],
        size: {
            width: 100,
            height: 27
        }
    };

    return <Screen { ...props } />;
};


ReactDOM.render(
    <HotlineMaiame />,
    document.getElementById('root')
);

module.hot.accept();