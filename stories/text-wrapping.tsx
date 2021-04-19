import * as React from 'react';
import { useState } from 'react';

import useInterval from '../lib/helpers/use-interval';
import Screen from "../lib/index";
import { getTextValue } from './util/get-values';

export default () => {
    const title = 'textarea ui hard wrapping feature';
    const longText = 'La contratación sostenible es aplicable tanto al sector privado como del sector público, y por supuesto sus promotores aspiran a ver su aplicación en todos los ámbitos de la economía. Influir en la práctica de contratación dentro de una empresa del sector privado no es sencillo para los gobiernos, lo que significa que las propias empresas a menudo tienen que automotivarse para abrazar la sostenibilidad.';
    const width = 60;
    
    const [margin, setMargin] = useState(0);
    useInterval(() => {
        setMargin(() => margin < width ? margin + 1 : -title.length);
    }, 250)

    const props = {
        buttons: [],
        free: true,
        windows: [
            {
                bounds: {
                    top: 0,
                    left: 0,
                    right: width,
                    bottom: 15
                },
                color: {
                    foreground: {
                        background: 'yellow',
                        characters: 'blue'
                    }
                },
                text: getTextValue('left', {x: 1, y: 2}, longText),
                title: getTextValue('left', {x: margin}, title),
            }
        ],
        size: {
            width,
            height: 15 
        }
    };

    return <Screen {...props} />;
};