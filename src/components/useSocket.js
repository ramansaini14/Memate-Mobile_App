import {useEffect, useRef} from 'react';
import io from 'socket.io-client';

export const useSocket = (url, options = {}) => {
  const socketRef = useRef(null);

  useEffect(() => {
    console.log('URL ====> ', url);
    const socket = io(url, {
      transports: ['websocket'], // Important for React Native
      ...options,
    });

    socketRef.current = socket;
    socket.on('connect', () => {
      console.log('✅ Connected to socket server');
    });

    return () => {
      socket.disconnect();
    };
  }, [url]);

  return socketRef.current;
};
