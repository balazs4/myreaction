import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';





const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_USER':
            return Object.assign({}, state, { isFetching: true })
        case 'FETCH_USER_REJECT':
        case 'FETCH_USER_RESOLVE':
            return Object.assign({}, state, { isFetching: false });

        default:
            return state;
    }
}

const store = createStore(reducer, {})

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);