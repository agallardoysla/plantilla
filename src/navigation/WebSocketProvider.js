import React, {createContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import api_config from '../services/api_config';
import {useDispatch} from 'react-redux';
import {pushMessage} from '../reducers/conversations';
import { otherUserFollowUser } from '../reducers/user';

export const WebSocketContext = createContext({});

export const WebSocketProvider = ({children}) => {
  const url = api_config.webSocketUrl;
  const dispatch = useDispatch();
  const handlers = [
    {
      event: 'follow_request_received',
      action: (info) => {
        console.log('handling follow_request_received', info);
        dispatch(otherUserFollowUser(info.user));
      },
    },
    {
      event: 'post_reaction_created',
      action: (info) => {
        console.log('handling post_reaction_created', info);
      },
    },
    {
      event: 'post_comment_created',
      action: (info) => {
        console.log('handling post_comment_created', info);
      },
    },
    {
      event: 'comment_comment_created',
      action: (info) => {
        console.log('handling comment_comment_created', info);
      },
    },
    {
      event: 'profile_reaction_created',
      action: (info) => {
        console.log('handling profile_reaction_created', info);
      },
    },
    {
      event: 'comment_reaction_created',
      action: (info) => {
        console.log('handling comment_reaction_created', info);
      },
    },
    {
      event: 'message_received',
      action: (info) => {
        console.log('handling message_received', info.data.message);
        dispatch(pushMessage(info.data.message));
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
          console.log(info);
          handlers.forEach((h) => {
            if (h.event === info.event) {
              h.action(info);
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
