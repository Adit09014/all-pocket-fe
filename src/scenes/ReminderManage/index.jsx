import { useState, useEffect } from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Swal from 'sweetalert2'; 
import axios from 'axios';      
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Modal,
  TextField,
  IconButton,
  Button
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Header } from '../../Components/Headers';
import { tokens } from '../../theme';
import {EditReminder} from './EditReminder'

export const Reminder = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currEvent, setCurrEvent] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [reminders,setReminders]=useState([]);
  const [selectedDateInfo, setSelectedDateInfo] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
    const [reminderToEdit, setReminderToEdit] = useState(null);

  const BASE_URL = 'http://localhost:3000';

  const handleDateClick = (selectInfo) => {
    setSelectedDateInfo(selectInfo);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setTitle('');
    setAmount('');
    setType('');
    setSelectedDateInfo(null);
  };

  const getReminders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/reminders`,{
        withCredentials:true
      });
    setReminders(response.data.reverse());
  } catch (error) {
    console.error("Error fetching reminders:", error);
  }
};

  useEffect(() => {
    getReminders();
  }, []);

  const handleSave = async () => {
  if (title && amount && type && selectedDateInfo) {
    try {
      await axios.post(`${BASE_URL}/api/reminders`, {
        title,
        amount: Number(amount),
        type,
        duedate: selectedDateInfo.startStr
      },{
        withCredentials:true
      });
      await getReminders(); 
      Swal.fire("Submitted!", "Your Reminder has been added.", "success");
    } catch (error) {
      console.error('Error creating reminder:', error);
      Swal.fire("Error", "Failed to add reminder.", "error");
    }

    handleClose();
  }

  
};

const handleEditReminder = (reminder) => {
  setReminderToEdit(reminder);
  setEditModalOpen(true);
};

const handleEditClose = () => {
  setEditModalOpen(false);
  setReminderToEdit(null);
  getReminders();
};


const deleteReminder = (id) => {
  Swal.fire({
    title: "Mark this reminder as done?",
    text: "Once marked, this reminder will be removed from your list.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, mark as done",
    cancelButtonText: "Cancel"
  }).then((result) => {
    if (result.isConfirmed) {
      deleteApi(id);
    }
  });
};


  const deleteApi = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/api/reminders/${id}`,{
        withCredentials:true
      });
    Swal.fire({
      icon: "success",
      title: "Marked as Done",
      text: "The reminder has been successfully removed.",
      timer: 2000,
      showConfirmButton: false
    });
    getReminders();
  } catch (error) {
    console.error("failed:", error);
    Swal.fire({
      icon: "error",
      title: "Failed to Remove",
      text: "Something went wrong while marking the reminder.",
    });
  }
};

const handleEventDrop = async (info) => {
  const id = info.event.id;
  const newDate = info.event.startStr;

  try {
    await axios.put(`${BASE_URL}/api/reminders/${id}`, {
      duedate: newDate,
    },{
        withCredentials:true
      });

    Swal.fire({
      icon: "success",
      title: "Updated",
      text: "Reminder date updated successfully.",
      timer: 2000,
      showConfirmButton: false
    });

    getReminders();
  } catch (error) {
    console.error("Update failed:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Could not update reminder date.",
    });
    info.revert();
  }
};


  return (
    <Box m='20px'>
      <Header title='Reminders' subtitle='Your Reminders' />

      <Modal open={modalOpen} onClose={handleClose}>
        <Box
          sx={{
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Typography variant="h6" gutterBottom>Add Reminder</Typography>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            variant="outlined"
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            variant="outlined"
            sx={{ mt: 2 }}
          />
          <Box textAlign="right" mt={3}>
            <Button variant="contained" onClick={handleSave} color='secondary'>Save</Button>
          </Box>
        </Box>
      </Modal>
      
      <Modal open={editModalOpen} onClose={handleEditClose}>
        <Box
          sx={{
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {reminderToEdit && (
            <EditReminder
              closeEvent={handleEditClose}
              reminderToEdit={reminderToEdit}
            />
          )}
        </Box>
      </Modal>

      <Box display="flex" justifyContent="space-between">
        <Box flex="1 1 20%" backgroundColor={colors.primary[500]} p="15px" borderRadius="4px">
          <Typography variant='h5'>Reminders</Typography>
          <List>
            {reminders.map((event) => (
              <ListItem
                key={event._id}
                sx={{
                  backgroundColor: colors.blueAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Box>
                  <Typography fontWeight="bold">{event.title}</Typography>
                  <Typography>₹{event.amount}</Typography>
                  <Typography variant="body2">
                    {formatDate(event.duedate, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                </Box >
                <Box display="flex">
                  <IconButton onClick={()=>{handleEditReminder(event)}}>
                    <EditIcon/>
                  </IconButton>
                  <IconButton onClick={() => deleteReminder(event._id)}>
                    <CheckCircleOutlineOutlinedIcon />  
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>

        </Box>

        <Box minWidth="900px" ml='15px'>
          <FullCalendar
            height="75vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            events={reminders.map(reminder => ({
              id: reminder._id,
              title: reminder.title,
              start: reminder.duedate
            }))}
            eventDrop={handleEventDrop}
          />
        </Box>
      </Box>
    </Box>
  );
};
