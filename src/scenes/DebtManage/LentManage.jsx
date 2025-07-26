import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, Stack,useTheme,IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import PaidIcon from '@mui/icons-material/Paid';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddLent from './AddLent';
import EditLent from './EditLent';

import { useAppStore } from './appStore';
import {tokens} from '../../theme';

const modalStyle = {
  position: 'absolute', top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400, bgcolor: 'background.paper',
  boxShadow: 24, p: 4, borderRadius: 2
};

const BASE_URL = 'https://all-pocket-be.onrender.com/';

export default function LentManage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('add');
  const [selectedLent, setSelectedLent] = useState(null);
  const setLentRows = useAppStore(state => state.setLentRows);
  const lentRows = useAppStore(state => state.lentRows);

  const fetchLents = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/lent`,{
        withCredentials:true
      });
      const data = res.data.reverse();
      setLentRows(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLents();
  }, []);

  const handleEdit = (row) => {
    setSelectedLent(row);
    setMode('edit');
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedLent(null);
    setMode('add');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchLents();
  };

  const markAsPaid = (id) => {
    Swal.fire({
      title: 'Mark as Paid?',
      text: 'This will remove the lent entry.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, mark as paid'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${BASE_URL}/api/lent/${id}`,{
        withCredentials:true
      });
        fetchLents();
        Swal.fire('Success', 'Lent entry marked as paid.', 'success');
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
          <IconButton color="success" onClick={() => markAsPaid(params.row._id)}><PaidIcon /></IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          {mode === 'add' ? (
            <AddLent closeEvent={handleClose} />
          ) : (
            <EditLent closeEvent={handleClose} lentToEdit={selectedLent} />
          )}
        </Box>
      </Modal>

      <Box m={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight={600}>Lent Records</Typography>
          <Button variant="contained" onClick={handleAdd} startIcon={<AddCircleOutlineIcon />} color='secondary' >Add Lent</Button>
        </Stack>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={lentRows}
            getRowId={(row) => row._id}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 25]}
            components={{ Toolbar: GridToolbar }}
            disableSelectionOnClick
          />
        </Box>
      </Box>
    </>
  );
}
