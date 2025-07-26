import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAppStore } from '../../appStore';

const BASE_URL = 'https://all-pocket-be.onrender.com/';

export function EditBudget({ closeEvent, budgetToEdit }) {
  const [category, setCategory] = useState('');
  const [spent, setSpent] = useState('');
  const [limit, setLimit] = useState('');
  const setRows = useAppStore((state) => state.setRows);

  useEffect(() => {
    if (budgetToEdit) {
      setCategory(budgetToEdit.category);
      setSpent(budgetToEdit.spent);
      setLimit(budgetToEdit.limit);
    }
  }, [budgetToEdit]);

  const updateBudget = async () => {
    try {
      await axios.put(`${BASE_URL}/api/budgets/${budgetToEdit._id}`, {
        category,
        spent: Number(spent),
        limit: Number(limit),
      },{
        withCredentials:true
      });
      const res = await axios.get(`${BASE_URL}/api/budgets`,{
        withCredentials:true
      });
      setRows(res.data.reverse());
      closeEvent();
      Swal.fire("Updated!", "Budget updated successfully.", "success");
    } catch (error) {
      console.error('Error updating budget:', error);
      Swal.fire("Error", "Failed to update budget.", "error");
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h3" align="center" style={{ fontWeight: 'bold' }}>EDIT BUDGET</Typography>
      <IconButton style={{ position: "absolute", top: "0", right: "0" }} onClick={closeEvent}>
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
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Spent"
            variant="outlined"
            size="small"
            fullWidth
            type="number"
            value={spent}
            onChange={(e) => setSpent(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Limit"
            variant="outlined"
            size="small"
            fullWidth
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" fullWidth onClick={updateBudget}>
            Update
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
