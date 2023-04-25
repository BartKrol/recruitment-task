import { Container, Typography, TextField, Stack, Button } from '@mui/material';
import { useConnect } from '../utils/chat';
import { useCallback, useState } from 'react';
import Message from './Message';

export type ChatProps = {
  user: { id: string };
};

export function Chat({ user }: ChatProps) {
  const { sendMessage, messages } = useConnect();
  const [message, setMessage] = useState('');

  const handleSend = useCallback(() => {
    sendMessage(message);
    setMessage('');
  }, [message, sendMessage]);

  return (
    <Container maxWidth="xl" sx={{ margin: 0 }}>
      <Typography variant="h4" gutterBottom>
        Chat
      </Typography>
      <Stack spacing={1}>
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            isCurrentUser={user.id === message.fromUser.id}
          />
        ))}
      </Stack>
      <Stack direction="row" spacing={1} marginTop={2}>
        <TextField
          label="Type here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" onClick={handleSend}>
          Send
        </Button>
      </Stack>
    </Container>
  );
}

export default Chat;
