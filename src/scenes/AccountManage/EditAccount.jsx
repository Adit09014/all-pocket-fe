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

export function EditAccount({ closeEvent, accountToEdit }) {
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState('');
  const setRows = useAppStore((state) => state.setRows);

  useEffect(() => {
    if (accountToEdit) {
      setAccountName(accountToEdit.accountname);
      setAccountNumber(accountToEdit.accountnumber);
      setBalance(accountToEdit.balance);
    }
  }, [accountToEdit]);

  const updateAccount = async () => {
    try {
      await axios.put(`${BASE_URL}/api/accounts/${accountToEdit._id}`, {
        accountname: accountName,
        accountnumber: Number(accountNumber),
        balance: Number(balance),
      },{
        withCredentials:true
      }); 

      const res = await axios.get(`${BASE_URL}/api/accounts`,{
        withCredentials:true
      });
      setRows(res.data);
      closeEvent();
      Swal.fire("Updated!", "Account updated successfully.", "success");
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h3" align="center" style={{fontWeight:'bold'}}>EDIT ACCOUNT</Typography>
      <IconButton style={{ position: "absolute", top: "0", right: "0" }} onClick={closeEvent}>
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Account Name"
            variant="outlined"
            size="small"
            fullWidth
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Account Number"
            variant="outlined"
            size="small"
            fullWidth
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Balance"
            variant="outlined"
            size="small"
            fullWidth
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" fullWidth onClick={updateAccount}>
            Update
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
