import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';
import { FeedProvider } from './FeedContext';
import { MenuProvider } from 'react-native-popup-menu';

export default function Providers() {
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
