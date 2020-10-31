import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';
import {MenuProvider} from 'react-native-popup-menu';
import {Provider} from 'react-redux';
import configureStore from '../store';
import {WebSocketProvider} from './WebSocketProvider';

export default function Providers() {
  // websocket_client.init();
  const store = configureStore();

  return (
    <Provider store={store}>
      <WebSocketProvider>
        <MenuProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </MenuProvider>
      </WebSocketProvider>
    </Provider>
  );
}
