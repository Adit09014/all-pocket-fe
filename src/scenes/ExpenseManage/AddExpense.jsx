import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Typography,
  Box,
  Button,
  IconButton,
  Grid,
  TextField
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:3000';

export default function AddExpense({ closeEvent, refreshExpenses }) {
  const [category, setCategory] = useState('');
  const [spent, setSpent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const resetForm = () => {
    setCategory('');
    setSpent('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  

  const createExpense = async () => {
    if (!category || !spent || !date) {
      Swal.fire("Incomplete", "Please fill in all fields.", "warning");
      return;
    }

    if (isNaN(spent)) {
      Swal.fire("Invalid Input", "Spent must be a number.", "warning");
      return;
    }

    const formattedDate = new Date(date).toISOString().split('T')[0];

    const payload = {
      category: category.trim(),
      spent: Number(spent),
      date: formattedDate
    };

    try {
      await axios.post(`${BASE_URL}/api/expenses`, payload,{
        withCredentials:true
      });
      await refreshExpenses();
      resetForm();
      closeEvent();
      Swal.fire("Submitted!", "Your expense has been added.", "success");
    } catch (error) {
      console.error('Error creating expense:', error?.response?.data || error.message);
      Swal.fire("Error", "Failed to add expense.", "error");
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center" sx={{ fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
        Add Expense
      </Typography>
      <IconButton
        sx={{ position: 'absolute', top: 8, right: 8 }}
        onClick={() => {
          resetForm();
          closeEvent();
        }}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Category"
            variant="outlined"
            size="small"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onBlur={() => setCategory(category.trim())}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Spent"
            variant="outlined"
            size="small"
            fullWidth
            value={spent}
            onChange={(e) => setSpent(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            size="small"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={createExpense}
            sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
