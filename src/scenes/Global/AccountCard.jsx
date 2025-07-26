import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Typography,
  Divider,
  Box,
  Button
} from '@mui/material';

import ProfileImg from "./profile.jpeg";

export default function AccountCard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://all-pocket-be.onrender.com/api/auth/verify', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setUser({
            email: data.user.email,
            image: ProfileImg,
          });
        }
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await fetch('https://all-pocket-be.onrender.com/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
    window.location.href = '/login';
  };

  if (!user) return null;

  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        p: 2,
      }}
    >
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Avatar src={user.image} />
        <Box>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box mt={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          fullWidth
          sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '8px' }}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );
}
