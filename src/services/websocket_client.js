// import api_config from './api_config';
// import auth from '@react-native-firebase/auth';

// const url = api_config.webSocketUrl;

// const init = async () => {
//   console.log('Init WS');
//   const token = await auth().currentUser.getIdToken(true);

//   const headers = {
//     Authorization: `JWT ${token}`,
//   };

//   const ws = new WebSocket(url, '', {origin: url, headers: headers});

//   ws.onopen = () => {
//     console.log('connected');
//   };

//   ws.on('close', function close() {
//     console.log('disconnected');
//   });

//   ws.onmessage = function incoming(data) {
//     console.log("message", data);
//   };
// };

// export default {
//   init,
// };
