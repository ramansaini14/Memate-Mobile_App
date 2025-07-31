// socketService.js
import {io} from 'socket.io-client';

const SOCKET_URL = 'https://chatd.memate.com.au'; // Replace with actual server URL

let socket;
export const getSocket = () => socket;
export const connectSocket = () => {
  socket = io(SOCKET_URL, {
    transports: ['websocket'],
  });

  console.log('🔗 Connecting to socket:', SOCKET_URL);

  socket.on('connect', () => {
    console.log('✅ Socket connected successfully:');
  });

  socket.on('connect_error', err => {
    console.error('❌ Socket connection error:', err);
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log('🔌 Socket disconnected');
  }
};

export const emitSocket = (event, data, callback) => {
  console.log(
    'event ===> ',
    event,
    '  socket ====> ',
    socket,
    ' data ===> ',
    data,
  );
  if (socket) {
    socket.emit(event, data, response => {
      callback(response);
      console.log('Response Chat', response); // ok
    });
  }
};
export const emitSocketWithoutCallback = (event, data) => {
  console.log('event ===> ', event, '  socket ====> ', socket);
  if (socket) {
    socket.emit(event, data);
  }
};

export const emitSocketWithAck = (eventName, data) => {
  if (socket) {
    return new Promise((resolve, reject) => {
      // emit with ack callback
      this.socket.timeout(5000).emit('register_user', data, (err, response) => {
        if (err) {
          // e.g. timeout
          return reject(new Error('register_user timed out'));
        }
        if (response.status === 'success') {
          resolve(response);
        } else {
          reject(new Error(response.message || 'register_user error'));
        }
      });
    });
  }
};

export const onSocket = (event, callback) => {
  console.log('Event ===> ', event);
  if (socket) {
    socket.on(event, callback);
  }
};

export const offSocket = event => {
  if (socket) {
    socket.off(event);
  }
};
