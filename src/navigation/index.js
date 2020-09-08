import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';
import { FeedProvider } from './FeedContext';

export default function Providers() {
  return (
    <AuthProvider>
      <FeedProvider>
        <Routes />
      </FeedProvider>
    </AuthProvider>
  );
}
