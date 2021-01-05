import React from 'react';
import {LogBox} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import Routes from './src/navigation/Routes';
import {createLogger} from 'redux-logger';

import rootReducer from './src/redux/reducers';
import AsyncStorage from '@react-native-community/async-storage';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore, persistReducer} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';

export default function App() {
  LogBox.ignoreAllLogs();

  const persistConfig = {
    key: 'root2',
    keyPrefix: '',
    storage: AsyncStorage,
    whitelist: ['prueba'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    undefined,
    applyMiddleware(promise, thunk),
  );

  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={false}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}
