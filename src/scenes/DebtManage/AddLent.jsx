import React, { useState } from 'react';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAppStore } from './appStore';

const BASE_URL = 'https://all-pocket-be.onrender.com/';

export default function AddLent({ closeEvent }) {
  const [person, setPerson] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const setLentRows = useAppStore(state => state.setLentRows);

  const handleSubmit = async () => {
    if (!person || isNaN(amount) || !description || !date) {
      Swal.fire("Invalid Input", "Please fill all fields correctly.", "warning");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/lent`, {
        person,
        amount: Number(amount),
        description,
        date,
      },{
        withCredentials:true
      });

      const res = await axios.get(`${BASE_URL}/api/lent`,{
        withCredentials:true
      });
      setLentRows(res.data.reverse());
      closeEvent();
      Swal.fire("Success", "Lent added successfully.", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to add lent.", "error");
    }
  };

  return (
    <>
      <Typography variant="h6" textAlign="center" fontWeight={600} color='secondary'>Add Lent</Typography>
      <IconButton onClick={closeEvent} sx={{ position: 'absolute', top: 8, right: 8 }}><CloseIcon /></IconButton>
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}><TextField label="Person" fullWidth size="small" value={person} onChange={(e) => setPerson(e.target.value)} /></Grid>
          <Grid item xs={6}><TextField label="Amount" fullWidth size="small" value={amount} onChange={(e) => setAmount(e.target.value)} /></Grid>
          <Grid item xs={6}><TextField label="Description" fullWidth size="small" value={description} onChange={(e) => setDescription(e.target.value)} /></Grid>
          <Grid item xs={12}><TextField label="Date" fullWidth size="small" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></Grid>
          <Grid item xs={12}><Button variant="contained" fullWidth onClick={handleSubmit} color='secondary'>Add</Button></Grid>
        </Grid>
      </Box>
    </>
  );
}
