import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';
import {FeedProvider} from './FeedContext';
import {MenuProvider} from 'react-native-popup-menu';
// import websocket_client from '../services/websocket_client';

export default function Providers() {
  // websocket_client.init();

  return (
    <MenuProvider>
      <AuthProvider>
        <FeedProvider>
          <Routes />
        </FeedProvider>
      </AuthProvider>
    </MenuProvider>
  );
}
