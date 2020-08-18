import React, { useState } from "react";
import ReactDOM from "react-dom";

import useInterval from './lib/helpers/use-interval';
import UI from "./lib/index.tsx";

const Example = () => {
    const title = 'textarea-ui align feature';
    const width = 60;
    
    const [margin, setMargin] = useState(0);
    useInterval(() => {
        setMargin(() => margin < width ? margin + 1 : -title.length);
    }, 250)

    const props = {
        buttons: [],
        text: {
            align: 'left',
            margin: { x: 2, y: 2 },
            value: 'La contratación sostenible es aplicable tanto al sector privado como del sector público, y por supuesto sus promotores aspiran a ver su aplicación en todos los ámbitos de la economía. Influir en la práctica de contratación dentro de una empresa del sector privado no es sencillo para los gobiernos, lo que significa que las propias empresas a menudo tienen que automotivarse para abrazar la sostenibilidad.'
        },
        title: {
            align: 'left',
            margin,
            value: title
        },
        begin: {
            x: 0,
            y: 0
        },
        size: {
            width,
            height: 15 
        },
        forced: false
    };

    return <UI {...props} />;
};


ReactDOM.render(
    <Example />,
    document.getElementById('root')
);

module.hot.accept();