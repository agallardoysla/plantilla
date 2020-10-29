import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';
import {FeedProvider} from './FeedContext';
import {MenuProvider} from 'react-native-popup-menu';
import {WebSocketProvider} from './WebSocketProvider';

export default function Providers() {
  return (
    <WebSocketProvider>
      <MenuProvider>
        <AuthProvider>
          <FeedProvider>
            <Routes />
          </FeedProvider>
        </AuthProvider>
      </MenuProvider>
    </WebSocketProvider>
  );
}
