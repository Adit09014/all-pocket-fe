import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAppStore } from '../../appStore';

const BASE_URL = 'http://localhost:3000';

export function EditReminder({ closeEvent, reminderToEdit }) {
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderAmount, setReminderAmount] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [reminderType, setReminderType] = useState('');
  const setRows = useAppStore((state) => state.setRows);

  useEffect(() => {
    if (reminderToEdit) {
        setReminderTitle(reminderToEdit.title || '');
        setReminderAmount(reminderToEdit.amount || '');
        setReminderType(reminderToEdit.type || '');

        const rawDate = reminderToEdit.duedate;
        if (rawDate) {
        const parsedDate = new Date(rawDate);
        if (!isNaN(parsedDate)) {
            setReminderDate(parsedDate.toISOString().split('T')[0]);
        } else {
            setReminderDate('');
        }
        } else {
        setReminderDate('');
        }
    }
    }, [reminderToEdit]);


  const updateReminder = async () => {
    try {
      await axios.put(`${BASE_URL}/api/reminders/${reminderToEdit._id}`, {
        title:reminderTitle,
        amount: Number(reminderAmount),
        type:reminderType,
        duedate: new Date(reminderDate).toISOString()
      },{
        withCredentials:true
      });
      const res = await axios.get(`${BASE_URL}/api/reminders`,{
        withCredentials:true
      });
      setRows(res.data);
      closeEvent();
      Swal.fire("Updated!", "Reminder updated successfully.", "success");
    } catch (error) {
      console.error('Error updating Reminder:', error);
      Swal.fire("Error", "Failed to update reminder.", "error");
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h3" align="center" style={{ fontWeight: 'bold' }}>EDIT REMINDER</Typography>
      <IconButton style={{ position: "absolute", top: "0", right: "0" }} onClick={closeEvent}>
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Reminder Title"
            variant="outlined"
            size="small"
            fullWidth
            value={reminderTitle}
            onChange={(e) => setReminderTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Amount"
            variant="outlined"
            size="small"
            fullWidth
            value={reminderAmount}
            onChange={(e) => setReminderAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Type"
            variant="outlined"
            size="small"
            fullWidth
            value={reminderType}
            onChange={(e) => setReminderType(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Date"
            type='date'
            variant="outlined"
            size="small"
            fullWidth
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" fullWidth onClick={updateReminder}>
            Update
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
