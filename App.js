import React from 'react';
import Providers from './src/navigation';
import api_config from './src/services/api_config';
import auth from '@react-native-firebase/auth';

export default function App() {

  const url = api_config.webSocketUrl;

  const init = async () => {
    console.log('Init WS');
    const token = await auth().currentUser.getIdToken(true);
  
    const headers = {
      Authorization: `JWT ${token}`,
    };
  
    const ws = new WebSocket(url, '', {origin: url, headers: headers});
  
    console.log(ws);
    ws.onopen = () => {
      console.log('connected');
    };
  
    // ws.on('close', function close() {
    //   console.log('disconnected');
    // });
  
    ws.onmessage = function incoming(data) {
      console.log("message", data);
    };
  };
  
  init();

  return <Providers />;
}
