import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';
import {MenuProvider} from 'react-native-popup-menu';
import {Provider} from 'react-redux';
import configureStore from '../store';
import {WebSocketProvider} from './WebSocketProvider';
import Toast from 'react-native-toast-message';

export default function Providers() {
  // websocket_client.init();
  const store = configureStore();

  return (
    <Provider store={store}>
      {/* <WebSocketProvider> */}
        {/* <MenuProvider> */}
          {/* <AuthProvider> */}
            <Routes />
            {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
          {/* </AuthProvider> */}
        {/* </MenuProvider> */}
      {/* </WebSocketProvider> */}
    </Provider>
  );
}
