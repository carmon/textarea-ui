import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import AlignStory from "./stories/align-test";
import CarmonStory from "./stories/carmon-dev";
import TextWrap from "./stories/text-wrapping";

import './style.css';

const ExamplesContainer = () => {
  const [selected, setSelected] = useState(0);

  const examples = [
    <CarmonStory />,
    <TextWrap />,
    <AlignStory />,
  ];

  const downHandler = ({ key }) => {
    const n = Number(key) - 1; // Keys are not 0 based
    if (!isNaN(n) && n > -1 && n < examples.length)
      setSelected(n);
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []);

  return (
      <Fragment>
          {examples[selected]}
      </Fragment>
  );
};

ReactDOM.render(
    <ExamplesContainer />,
    document.getElementById('root')
);

module.hot.accept();