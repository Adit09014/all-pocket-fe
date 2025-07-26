import { Box, Button, useTheme, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Header } from '../../Components/Headers';
import axios from 'axios';
import { useEffect, useState } from "react";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { AddInvest } from './AddInvest';
import {EditInvest} from "./EditInvest";
import Swal from 'sweetalert2';
import { useAppStore } from '../../appStore';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
  fontFamily: 'Poppins, sans-serif'
};

export const InvestManage = () => {
  const BASE_URL = "https://all-pocket-be.onrender.com/";
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const [selectedinvest, setSelectedinvest] = useState(null);

  const rows = useAppStore((state) => state.rows);
  const setRows = useAppStore((state) => state.setRows);

  const handleOpenAdd = () => {
    setMode('add');
    setSelectedinvest(null);
    setOpen(true);
  };

  const handleOpenEdit = (invest) => {
    setMode('edit');
    setSelectedinvest(invest);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedinvest(null);
  };

  const getInvestments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/investments`,{
        withCredentials: true
      });
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching investments:", error);
    }
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/investments/${id}`,{
        withCredentials: true
      });
      Swal.fire("Deleted!", "investment has been deleted.", "success");
      getInvestments();
    } catch (error) {
      console.error("Delete failed:", error);
      Swal.fire("Error", "Failed to delete invest.", "error");
    }
  };

  useEffect(() => {
    getInvestments();
  }, []);

  const columns = [
    {
      field: "investmentname",
      headerName: "Investment Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box>
          <IconButton color="secondary" onClick={() => handleOpenEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => deleteUser(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    }
  ];

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          {mode === 'add' ? (
            <AddInvest closeEvent={handleClose} />
          ) : (
            <EditInvest closeEvent={handleClose} investToEdit={selectedinvest} />
          )}
        </Box>
      </Modal>

      <Box m="20px">
        <Header title="INVESTMENT MANAGE" subtitle="Manage your investments" />
        <Box
          m="0px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-cell": { borderBottom: "none" },
            "& .name-column--cell": { color: colors.greenAccent[300] },
            "& .MuiDataGrid-columnHeader": { backgroundColor: colors.primary[800], borderBottom: "none" },
            "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
            "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.greenAccent[600] },
            "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            endIcon={<AddCircleOutlinedIcon />}
            sx={{ mb: 2 }}
            onClick={handleOpenAdd}
          >
            Add
          </Button>
          <DataGrid rows={rows} columns={columns} getRowId={(row) => row._id} sx={{ maxHeight: '60vh' }} />
        </Box>
      </Box>
    </>
  );
};
