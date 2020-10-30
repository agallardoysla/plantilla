import React, {createContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import api_config from '../services/api_config';
import {useDispatch} from 'react-redux';
import {pushMessage} from '../reducers/conversations';

export const WebSocketContext = createContext({});

export const WebSocketProvider = ({children}) => {
  const url = api_config.webSocketUrl;
  const dispatch = useDispatch();
  const subscribers = [
    {
      event: 'follow_request_received', // creo que hay mas tipos de notificaciones pero no se si todas generan mensajes de WS
      action: (message) => {
        // hacer lo necesario
        console.log('handling follow_request_received', message);
      },
    },
    {
      event: 'message_received',
      action: (message) => {
        // hacer lo necesario
        console.log('handling message_received', message);
        dispatch(pushMessage(message));
      },
    },
  ];

  useEffect(() => {
    const init = async () => {
      const token = await auth().currentUser.getIdToken(true);

      const headers = {
        Authorization: `JWT ${token}`,
      };

      const ws = new WebSocket(url, '', {headers: headers});

      ws.onopen = () => {
        console.log('WS connected!');
      };

      // ws.on('close', function close() {
      //   console.log('disconnected');
      // });

      ws.onmessage = function incoming(message) {
        if (message.data.includes('Hi')) {
          console.log(message.data);
        } else {
          const info = JSON.parse(message.data);
          subscribers.forEach((s) => {
            if (s.event === info.event) {
              s.action(info.message);
            }
          });
        }
      };
    };
    init();
  }, []);

  return (
    <WebSocketContext.Provider
      value={{}}>
      {children}
    </WebSocketContext.Provider>
  );
};
