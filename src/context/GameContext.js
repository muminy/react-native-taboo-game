import React, { createContext,  } from 'react';



export const reducer = (state, action) => {
    switch (action.type) {
        case 'DELETE':
            return { time: state.time - 1}
        default:
            throw new Error();
    }
}

export const GameContext = createContext();