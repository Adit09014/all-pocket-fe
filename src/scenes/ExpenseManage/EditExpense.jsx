import React, { useState, useEffect } from 'react';
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
import { useAppStore } from '../../appStore';

const BASE_URL = 'https://all-pocket-be.onrender.com';

export default function EditExpense({ closeEvent, expenseToEdit }) {
  const [category, setCategory] = useState('');
  const [spent, setSpent] = useState('');
  const [date, setDate] = useState('');
  const setRows = useAppStore((state) => state.setRows);

  useEffect(() => {
    if (expenseToEdit) {
      setCategory(expenseToEdit.category || '');
      setSpent(expenseToEdit.spent?.toString() || '');
      setDate(expenseToEdit.date || '');
    }
  }, [expenseToEdit]);

  const updateExpense = async () => {
    if (!category || !spent || !date) {
      Swal.fire("Incomplete", "Please fill in all fields.", "warning");
      return;
    }

    if (isNaN(spent)) {
      Swal.fire("Invalid Input", "Spent must be a number.", "warning");
      return;
    }

    const formattedDate = new Date(date).toISOString().split('T')[0];

    try {
      await axios.put(`${BASE_URL}/api/expenses/${expenseToEdit._id}`, {
        category: category.trim(),
        spent: Number(spent),
        date: formattedDate
      },{
        withCredentials:true
      });

      const res = await axios.get(`${BASE_URL}/api/expenses`,{
        withCredentials:true
      });
      setRows(res.data.reverse());
      closeEvent();
      Swal.fire("Updated!", "Expense updated successfully.", "success");
    } catch (error) {
      console.error('Error updating expense:', error?.response?.data || error.message);
      Swal.fire("Error", "Failed to update expense.", "error");
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center" sx={{ fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
        Edit Expense
      </Typography>
      <IconButton
        sx={{ position: 'absolute', top: 8, right: 8 }}
        onClick={closeEvent}
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
            onClick={updateExpense}
            sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
          >
            Update
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
