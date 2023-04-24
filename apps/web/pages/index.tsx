import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, Stack, Container, Typography } from '@mui/material';
import Login from '../components/Login';
import Chat from '../components/Chat';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  backgroundColor: alpha(theme.palette.secondary.main, 0.08),
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
}));

export function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Container maxWidth="sm" style={{ margin: 0 }}>
      <ContentStyle>
        <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              Subflow
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Recruitment Task
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
          {isLoggedIn ? (
            <Chat />
          ) : (
            <Login onSuccess={() => setIsLoggedIn(true)} />
          )}
        </Stack>
      </ContentStyle>
    </Container>
  );
}

export default Index;
