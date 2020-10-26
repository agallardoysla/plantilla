import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';
import {FeedProvider} from './FeedContext';
import {MenuProvider} from 'react-native-popup-menu';
// import websocket_client from '../services/websocket_client';
import {Provider} from 'react-redux';
import configureStore from '../store';


export default function Providers() {
  // websocket_client.init();
  const store = configureStore();

  return (
    <Provider store={store}>
      <MenuProvider>
        <AuthProvider>
          <FeedProvider>
            <Routes />
          </FeedProvider>
        </AuthProvider>
      </MenuProvider>
    </Provider>
  );
}
