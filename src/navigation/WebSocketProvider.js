import React, {createContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import api_config from '../services/api_config';

export const WebSocketContext = createContext({});

export const WebSocketProvider = ({children}) => {
  const url = api_config.webSocketUrl;
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
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
    init();
  }, []);

  const addSubscriber = (newSubscriber) => setSubscribers([...subscribers, newSubscriber]);

  return (
    <WebSocketContext.Provider
      value={{
        addSubscriber,
      }}>
      {children}
    </WebSocketContext.Provider>
  );
};
