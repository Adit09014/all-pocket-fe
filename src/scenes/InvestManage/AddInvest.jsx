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

export const AddInvest=({ closeEvent })=> {
  const [investName, setInvestname] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const setRows = useAppStore((state) => state.setRows);

  const getInvests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/investments`,{
        withCredentials:true
      });
      console.log('Fetched investments:', res.data);
      setRows(res.data);
    } catch (err) {
      console.error("Error fetching investments:", err);
    }
  };

  const handleinvestNameChange = (e) => setInvestname(e.target.value);
  const handletypeChange = (e) => setType(e.target.value);
  const handleBalanceChange = (e) => setAmount(e.target.value);

  const createinvest = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/investments`, {
        investmentname: investName,
        type: type,
        amount: Number(amount),
      },{
        withCredentials: true
      });
      console.log('invest created:', response.data);
      await getInvests();
      closeEvent();
      Swal.fire("Submitted!", "Your invest Details has been submitted.", "success");
    } catch (error) {
      console.error('Error creating invest:', error);
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h3" align="center" style={{fontWeight:'bold'}}>ADD INVESTMENT</Typography>
      <IconButton style={{ position: "absolute", top: "0", right: "0" }} onClick={closeEvent}>
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="invest-name"
            label="Investment Name"
            variant="outlined"
            size="small"
            fullWidth
            value={investName}
            onChange={handleinvestNameChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="type"
            label="Type"
            variant="outlined"
            size="small"
            fullWidth
            value={type}
            onChange={handletypeChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="amount"
            label="Amount"
            variant="outlined"
            size="small"
            fullWidth
            value={amount}
            onChange={handleBalanceChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" fullWidth onClick={createinvest}>
            Submit
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
