import { Box, Stack, Chip, Typography } from '@mui/material';
import { formatDistance } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { Message as MessageData } from '../utils/chat';

export type MessageProps = {
  message: MessageData;
  isCurrentUser: boolean;
};

function Message({ message, isCurrentUser }: MessageProps) {
  return (
    <Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Typography variant="body2" color="GrayText">
          {isCurrentUser ? 'You' : message.fromUser.name}
        </Typography>
        <Typography variant="body2" color="GrayText">
          {formatDistance(zonedTimeToUtc(message.createdAt, 'UTC'), new Date())}
        </Typography>
      </Box>
      <Chip
        sx={{
          height: 'auto',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal',
          },
          paddingY: 1,
          justifyContent: 'flex-start',
        }}
        label={message.text}
        color={isCurrentUser ? 'primary' : 'secondary'}
      />
    </Stack>
  );
}

export default Message;
