import React, {createContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import api_config from '../services/api_config';
import {useDispatch} from 'react-redux';
import {pushMessage} from '../reducers/conversations';
import { addReaction, otherUserFollowUser } from '../reducers/user';
import { addNotification } from '../reducers/notifications';

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
        createNotification(info);
      },
    },
    {
      event: 'post_reaction_created',
      action: (info) => {
        console.log('handling post_reaction_created', info);
        createNotification(info);
      },
    },
    {
      event: 'post_comment_created',
      action: (info) => {
        console.log('handling post_comment_created', info);
        createNotification(info);
      },
    },
    {
      event: 'comment_comment_created',
      action: (info) => {
        console.log('handling comment_comment_created', info);
        createNotification(info);
      },
    },
    {
      event: 'profile_reaction_created',
      action: (info) => {
        console.log('handling profile_reaction_created', info);
        createNotification(info);
        dispatch(
          addReaction({
            id: info.id,
            created_at: Date.now(),
            updated_at: Date.now(),
            is_show: true,
            is_notificated: false,
            // user: ?,
            // reaction_type: null,
          }),
        );
      },
    },
    {
      event: 'comment_reaction_created',
      action: (info) => {
        console.log('handling comment_reaction_created', info);
        createNotification(info);
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

  const messageToNotification = (message) => {
    return {
      ...message,
      from_user: message.user,
      created_at: Date.now(),
      is_read: false,
    };
  };

  const createNotification = (info) => {
    dispatch(addNotification(messageToNotification(info)));
  };

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
