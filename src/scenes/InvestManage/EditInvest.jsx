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

export function EditInvest({ closeEvent, investToEdit }) {
  const [InvestName, setInvestName] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const setRows = useAppStore((state) => state.setRows);

  useEffect(() => {
    if (investToEdit) {
      setInvestName(investToEdit.investmentname);
      setType(investToEdit.type);
      setAmount(investToEdit.amount);
    }
  }, [investToEdit]);

  const updateinvest = async () => {
    try {
      await axios.put(`${BASE_URL}/api/investments/${investToEdit._id}`, {
        investmentname: InvestName,
        type: type,
        amount: Number(amount),
      },{
        withCredentials: true
      });
      const res = await axios.get(`${BASE_URL}/api/investments`,{
        withCredentials: true
      });
      setRows(res.data);
      closeEvent();
      Swal.fire("Updated!", "invest updated successfully.", "success");
    } catch (error) {
      console.error('Error updating invest:', error);
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h3" align="center" style={{fontWeight:'bold'}}>EDIT INVESTMENT</Typography>
      <IconButton style={{ position: "absolute", top: "0", right: "0" }} onClick={closeEvent}>
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Investment Name"
            variant="outlined"
            size="small"
            fullWidth
            value={InvestName}
            onChange={(e) => setInvestName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Type"
            variant="outlined"
            size="small"
            fullWidth
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Amount"
            variant="outlined"
            size="small"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" fullWidth onClick={updateinvest}>
            Update
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
