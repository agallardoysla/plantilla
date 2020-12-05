import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import Routes from './src/navigation/Routes';
import reducers from './src/redux/reducers';
import {createLogger} from 'redux-logger';

export default function App() {
  LogBox.ignoreAllLogs();

  const storeWithMiddleWare = applyMiddleware(
    promise,
    thunk,
    // createLogger({collapsed: false}),
  )(createStore);

  return (
    <Provider store={storeWithMiddleWare(reducers)}>
      <Routes />
    </Provider>
  );
}
