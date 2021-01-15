import React from "react";
import ReactDOM from "react-dom";

import Story from "./stories/carmon-dev.tsx";

import './style.css';

ReactDOM.render(
    <Story />,
    document.getElementById('root')
);

module.hot.accept();