import { useCallback, useEffect, useState, useMemo } from 'react';
import { io } from 'socket.io-client';
import { config } from './config';
import { useGetToken } from '../store/tokenStore';

export type Message = {
  id: string;
  fromUser: {
    id: string;
    name: string;
  };
  text: string;
  createdAt: string;
};

export const useConnect = () => {
  const token = useGetToken();
  const socket = useMemo(
    () =>
      io(config.apiUrl, {
        auth: {
          token: `Bearer ${token}`,
        },
      }),
    [token]
  );
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [messages, setMessages] = useState<Message[]>([]);

  const onMessage = useCallback(
    (message: Message) => {
      setMessages((messages) =>
        messages.every((m) => message.id !== m.id)
          ? [...messages, message]
          : messages
      );
    },
    [setMessages]
  );

  const onConnect = useCallback(() => {
    console.log('Connected to Websocket');
    setIsConnected(true);
  }, [setIsConnected]);

  const onDisconnect = useCallback(() => {
    console.log('Disconnected from Websocket');
    setIsConnected(false);
  }, [setIsConnected]);

  useEffect(() => {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat', onMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [socket, onMessage, onConnect, onDisconnect]);

  useEffect(() => {
    if (!token) {
      socket.disconnect();
    }
  }, [socket, token]);

  const sendMessage = useCallback(
    (message: string) => {
      socket.emit('chat', { message });
    },
    [socket]
  );

  return { isConnected, sendMessage, messages };
};
