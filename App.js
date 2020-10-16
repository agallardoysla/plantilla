import React from 'react';
import Providers from './src/navigation';
import api_config from './src/services/api_config';
import auth from '@react-native-firebase/auth';
import websocket_client from './src/services/websocket_client';

export default function App() {
  websocket_client.init();

  return <Providers />;
}
