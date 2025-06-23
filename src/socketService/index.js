// socketService.js
import { io } from 'socket.io-client';

const SOCKET_URL = 'https://chatd.memate.com.au'; // Replace with actual server URL

let socket;

export const connectSocket = () => {
  socket = io(SOCKET_URL, {
    transports: ['websocket']
  });

  console.log('🔗 Connecting to socket:', SOCKET_URL);

  socket.on('connect', () => {
    console.log('✅ Socket connected successfully:');
  });

  socket.on('connect_error', (err) => {
    console.error('❌ Socket connection error:', err);
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log('🔌 Socket disconnected');
  }
};

export const emitSocket = (event, data) => {
  if (socket) {
    socket.emit(event, data);
  }
};

export const onSocket = (event, callback) => {
  if (socket) {
    socket.on(event, callback);
  }
};

export const offSocket = (event) => {
  if (socket) {
    socket.off(event);
  }
};