import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = 'https://all-pocket-be.onrender.com';

export const Settings = () => {
  const [useremail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/auth/verify`, {
          withCredentials: true
        });

        const { user } = res.data;

        const userRes = await axios.get(`${BASE_URL}/api/user/details/${user.userId}`, {
          withCredentials: true
        });

        const { email, fullname, phonenumber } = userRes.data;
        setUserEmail(email || '');
        setFullname(fullname || '');
        setPhonenumber(phonenumber || '');
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const updateUser = async () => {
    try {
      await axios.put(`${BASE_URL}/api/auth/settings`, {
        email: useremail,
        password,
        fullname,
        phonenumber
      }, {
        withCredentials: true
      });

      Swal.fire('Updated!', 'User details updated successfully.', 'success');
      setPassword('');
    } catch (error) {
      console.error('Error updating user:', error);
      Swal.fire('Error', 'Failed to update user details.', 'error');
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h3" align="center" fontWeight="bold">
        CHANGE USER DETAILS
      </Typography>
      <Box />
      <Grid m={10}>
        <Grid m={5}>
          <TextField
            label="Full Name"
            variant="outlined"
            size="small"
            fullWidth
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </Grid>
        <Grid m={5}>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            value={useremail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </Grid>
        <Grid m={5}>
          <TextField
            label="Phone Number"
            variant="outlined"
            size="small"
            fullWidth
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
          />
        </Grid>
        <Grid m={5}>
          <TextField
            label="New Password (leave blank to keep old one)"
            type="password"
            variant="outlined"
            size="small"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={updateUser}
            sx={{ maxWidth: '150px' }}
          >
            Update
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
};
