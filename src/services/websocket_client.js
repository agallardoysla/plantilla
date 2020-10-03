var WebSocket = require('ws');
import api_config from './api_config';
import auth from '@react-native-firebase/auth';

const url = api_config.webSocketUrl;

const init = async () => {
  const token = await auth().currentUser.getIdToken(true);

  const headers = {
    Authorization: `JWT ${token}`,
  };

  const ws = new WebSocket(url, {origin: url, headers: headers});

  ws.on('open', function open() {
    console.log('connected');
  });

  ws.on('close', function close() {
    console.log('disconnected');
  });

  ws.on('message', function incoming(data) {
    console.log(data);
  });
};

export default {
  init,
};
