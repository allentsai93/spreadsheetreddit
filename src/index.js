import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
//import { createLogger } from 'redux-logger';
import './index.css';
import App from './containers/App';
import { searchSubs, requestSubs } from './reducers'
import registerServiceWorker from './registerServiceWorker';

//const logger = createLogger();
const rootReducer = combineReducers({ searchSubs, requestSubs })
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
