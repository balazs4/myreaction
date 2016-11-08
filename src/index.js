import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './App';

import Rx from 'rxjs';
import { createEpicMiddleware } from 'redux-observable';



const epic = (action$) =>
    action$
        .ofType('FETCH_USER')
        //.delay(2000)
        .mergeMap(action =>
            Rx.Observable
                .ajax
                //.getJSON(`https://api.github.com/users/${action.username}`)
                .getJSON(`http://localhost:3000/users/${action.username}`)
                .map(result => ({ type: 'FETCH_USER_RESOLVE', result }))
                .catch(error => Rx.Observable.of({
                    type: 'FETCH_USER_RESOLVE',
                    error: error.xhr.response
                }))
                .takeUntil(action$.ofType('FETCH_USER_CANCEL'))
        );


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_USER':
            return Object.assign({}, state, { isFetching: true, result: undefined })
        case 'FETCH_USER_REJECT':
        case 'FETCH_USER_CANCEL':
            return Object.assign({}, state, { isFetching: false });
        case 'FETCH_USER_RESOLVE':
            return Object.assign({}, state, { isFetching: false, result: action.result });

        default:
            return state;
    }
}

const store = createStore(reducer,
    {},
    applyMiddleware(createEpicMiddleware(epic))
)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);