import api_config from './api_config';
import auth from '@react-native-firebase/auth';

const url = api_config.webSocketUrl;
const subscribers = [];

const init = async () => {
  console.log('Init WS');
  const token = await auth().currentUser.getIdToken(true);

  const headers = {
    Authorization: `JWT ${token}`,
  };

  const ws = new WebSocket(url, '', {headers: headers});

  ws.onopen = () => {
    console.log('connected');
  };

  // ws.on('close', function close() {
  //   console.log('disconnected');
  // });

  ws.onmessage = function incoming(message) {
    console.log("message", message, subscribers);
    subscribers.forEach(
      (s) => s.eventType === message.event && s.action(message.data),
    );
  };
};

const subscribe = subscribers.push;

export default {
  init,
  subscribe,
};
