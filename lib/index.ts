import { Mapper, Window } from './types';

export const screen = ({ width, height }: Window, func: Mapper) => 
    new Array(height).fill(0).map((_, y) => 
        new Array(width).fill(0).map((_,x) => 
            func({ x , y })
        ).join('')
    ).join('');