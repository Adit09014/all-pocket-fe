import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAppStore } from '../../appStore';

const BASE_URL = 'https://all-pocket-be.onrender.com/';

export const AddAccount=({ closeEvent })=> {
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState('');
  const setRows = useAppStore((state) => state.setRows);

  const getAccounts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/accounts`,{
        withCredentials:true
      });
      console.log('Fetched accounts:', res.data);
      setRows(res.data);
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  };

  const handleAccountNameChange = (e) => setAccountName(e.target.value);
  const handleAccountNumberChange = (e) => setAccountNumber(e.target.value);
  const handleBalanceChange = (e) => setBalance(e.target.value);

  const createAccount = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/accounts`, {
        accountname: accountName,
        accountnumber: Number(accountNumber),
        balance: Number(balance),
      },{
        withCredentials:true
      });
      console.log('Account created:', response.data);
      await getAccounts();
      closeEvent();
      Swal.fire("Submitted!", "Your Account Details has been submitted.", "success");
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h3" align="center" style={{fontWeight:'bold'}}>ADD ACCOUNT</Typography>
      <IconButton style={{ position: "absolute", top: "0", right: "0" }} onClick={closeEvent}>
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="account-name"
            label="Account Name"
            variant="outlined"
            size="small"
            fullWidth
            value={accountName}
            onChange={handleAccountNameChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="account-number"
            label="Account Number"
            variant="outlined"
            size="small"
            fullWidth
            value={accountNumber}
            onChange={handleAccountNumberChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="balance"
            label="Balance"
            variant="outlined"
            size="small"
            fullWidth
            value={balance}
            onChange={handleBalanceChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" fullWidth onClick={createAccount}>
            Submit
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
