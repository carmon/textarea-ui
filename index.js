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
                    bottom: 11
                },
                color: 'red',
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
                    top: 13,
                    left: 10,
                    right: 90,
                    bottom: 20
                },
                color: 'green',
                text: {
                    align: 'left',
                    margin: { x: 3, y: 3 },
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
                    top: 23,
                    left: 10,
                    right: 90,
                    bottom: 28
                },
                color: 'yellow',
                text: {
                    align: 'right',
                    margin: { x: 3, y: 2 },
                    value: "I'm right in the right dude!"
                },
                title: {
                    align: 'left',
                    margin: { x: 5 },
                    value: "[Scene test]"
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