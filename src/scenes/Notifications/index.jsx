import { useEffect, useState } from 'react';
import {
  IconButton, Popover, Stack, Typography, Alert, AlertTitle, Divider, Badge
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';

const BASE_URL = "http://localhost:3000/api";

export default function NotificationButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  const token = localStorage.getItem('token');
  const open = Boolean(anchorEl);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    await fetchNotifications();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchNotifications = async () => {
    if (!isMounted || !token) return;

    try {
      await axios.delete(`${BASE_URL}/notification`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await checkBudgets();
      await checkReminders();

      const res = await axios.get(`${BASE_URL}/notification`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (isMounted) setAlerts(res.data);
    } catch (err) {
      console.error("Error fetching notifications", err);
    }
  };

  const checkBudgets = async () => {
    const res = await axios.get(`${BASE_URL}/budgets`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    await Promise.all(res.data.map(item => {
      const percent = (item.spent / item.limit) * 100;
      if (percent >= 100) {
        return axios.post(`${BASE_URL}/notification`, {
          type: 'budget',
          alert: 'over',
          title: item.category
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else if (percent >= 70) {
        return axios.post(`${BASE_URL}/notification`, {
          type: 'budget',
          alert: 'caution',
          title: item.category
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      return null;
    }));
  };

  const checkReminders = async () => {
    const res = await axios.get(`${BASE_URL}/reminders`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    await Promise.all(res.data.map(item => {
      if (item.daysleft < 0) {
        return axios.post(`${BASE_URL}/notification`, {
          title: item.title,
          type: 'Due',
          alert: 'over'
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else if (item.daysleft <= 3) {
        return axios.post(`${BASE_URL}/notification`, {
          title: item.title,
          type: 'Due',
          alert: 'caution'
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      return null;
    }));
  };

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <Badge badgeContent={alerts.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            width: 300,
            maxHeight: 400,
            p: 2,
            overflowY: 'auto',
            borderRadius: 2,
          }
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Notifications
        </Typography>
        <Divider sx={{ mb: 1 }} />

        <Stack spacing={1}>
          {alerts.length === 0 ? (
            <Typography variant="body2">No notifications</Typography>
          ) : (
            alerts.map((item, index) => {
              if (item.type === 'budget') {
                return (
                  <Alert
                    key={index}
                    severity={item.alert === 'over' ? 'error' : 'warning'}
                    variant="outlined"
                    sx={{ fontSize: '0.85rem', p: 1 }}
                  >
                    <AlertTitle sx={{ fontSize: '0.8rem' }}>
                      {item.alert === 'over' ? 'Overbudget!' : 'Budget Alert'}
                    </AlertTitle>
                    You {item.alert === 'over' ? 'exceeded' : 'used over 70% of'} your <strong>{item.title}</strong> budget.
                  </Alert>
                );
              }

              if (item.type === 'Due') {
                return (
                  <Alert
                    key={index}
                    severity={item.alert === 'over' ? 'error' : 'warning'}
                    variant="outlined"
                    sx={{ fontSize: '0.85rem', p: 1 }}
                  >
                    <AlertTitle sx={{ fontSize: '0.8rem' }}>
                      {item.alert === 'over' ? 'Overdue Reminder!' : 'Upcoming Reminder'}
                    </AlertTitle>
                    Task: <strong>{item.title}</strong> is {item.alert === 'over' ? 'overdue' : 'due soon'}.
                  </Alert>
                );
              }

              return null;
            })
          )}
        </Stack>
      </Popover>
    </>
  );
}
