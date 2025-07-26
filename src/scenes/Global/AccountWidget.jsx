import React, { useEffect, useState } from 'react';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Box,
  Button,
  Stack
} from '@mui/material';

import ProfileImg from "./profile.jpeg"


export default function AccountWidget() {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetch('https://all-pocket-be.onrender.com//api/auth/verify', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setUser({
            name: data.user.email.split('@')[0],
            email: data.user.email,
            image:ProfileImg,
          });
        }
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await fetch('https://all-pocket-be.onrender.com//api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
    window.location.href = '/login';
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (!user) return null;

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <Avatar alt={user.name} src={user.image} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 1 }}
      >
        <MenuItem disableRipple disableTouchRipple sx={{ cursor: 'default' }}>
          <Box display="flex" alignItems="center" px={1}>
            <Avatar alt={user.name} src={user.image} sx={{ width: 48, height: 48, mr: 1.5 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontStyle="italic">
                {user.email}
              </Typography>
            </Box>
          </Box>
        </MenuItem>

        <Divider />

        <Box px={2} py={1}>
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
      </Menu>
    </>
  );
}
