import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { allReducer } from './reducers';
import { setLocalStore, accessStore } from './util/localStorage';

// prevent clickjacking
if (top == self) {
  document.body.style.display = 'block';
}

const middleWare = applyMiddleware(thunk, logger);

// issue with preloaded state on page refresh?
const persistedStore = accessStore();
const store = createStore(allReducer, persistedStore, middleWare);

store.subscribe(() => { setLocalStore({ surveyReducer: store.getState().surveyReducer }) });

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
