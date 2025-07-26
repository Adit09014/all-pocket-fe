import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, Stack,IconButton,useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import PaidIcon from '@mui/icons-material/Paid';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddDebt from './AddDebt';
import EditDebt from './EditDebt';
import { useAppStore } from './appStore';
import { tokens } from "../../theme";

const modalStyle = {
  position: 'absolute', top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400, bgcolor: 'background.paper',
  boxShadow: 24, p: 4, borderRadius: 2
};

const BASE_URL = 'https://all-pocket-be.onrender.com/';

export default function DebtManage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('add');
  const [selected, setSelected] = useState(null);
  const setDebtRows = useAppStore(s => s.setDebtRows);
  const debtRows = useAppStore(s => s.debtRows);

  const fetchDebts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/debt`,{
        withCredentials:true
      });
      const data = res.data.reverse();
      setDebtRows(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDebts();
  }, []);

  const handleAdd = () => {
    setSelected(null);
    setMode('add');
    setOpen(true);
  };

  const handleEdit = (row) => {
    setSelected(row);
    setMode('edit');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchDebts();
  };

  const markPaid = (id) => {
    Swal.fire({
      title: 'Mark as Paid?',
      text: 'This will remove the debt entry.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, mark as paid'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${BASE_URL}/api/debt/${id}`,{
        withCredentials:true
      });
        fetchDebts();
        Swal.fire('Success', 'Debt entry marked as paid.', 'success');
      }
    });
  };

  const columns = [
    { field: 'person', headerName: 'Person', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEdit(params.row)}> <EditIcon /></IconButton>
          <IconButton color="success" onClick={() => markPaid(params.row._id)}><PaidIcon /></IconButton>
        </Box>
      )
    },
  ];

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          {mode === 'add'
            ? <AddDebt closeEvent={handleClose} />
            : <EditDebt closeEvent={handleClose} debtToEdit={selected} />}
        </Box>
      </Modal>

      <Box m={2} >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} >
          <Typography variant="h5" fontWeight={600}>Debt Records</Typography>
          <Button variant="contained" color='secondary' onClick={handleAdd} startIcon={<AddCircleOutlineIcon />}>Add Debt</Button>
        </Stack>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={debtRows}
            getRowId={(row) => row._id}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 25]}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </>
  );
}
