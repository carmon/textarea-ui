import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import AlignStory from "./stories/align-test";
import CarmonStory from "./stories/carmon-dev";
import TextWrap from "./stories/text-wrapping";
import Welcome from "./stories/welcome";

import './style.css';

const getSearchWord = () => {
  const res = /\?([\w-]+)/g.exec(window.location.search);
  return res ? res[1] : undefined;
}

const ExamplesContainer = () => {
  const [selected, setSelected] = useState(0);

  const examples = [
    <Welcome />,
    <TextWrap />,
    <AlignStory />,
    <CarmonStory />,
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

const w = getSearchWord();

ReactDOM.render(
    w === 'web' ? <CarmonStory /> : <ExamplesContainer />,
    document.getElementById('root')
);

module.hot.accept();