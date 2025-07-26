import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import CancelIcon from '@mui/icons-material/Cancel';

export default function BudgetStatus({ budget }) {
  let icon, color, label;

  if (budget <= 0.7) {
    icon = <CheckCircleIcon sx={{ color: 'limegreen' }} />;
    color = 'limegreen';
    label = 'Healthy';
  } else if (budget <= 1) {
    icon = <WarningIcon sx={{ color: 'orange' }} />;
    color = 'orange';
    label = 'Caution';
  } else {
    icon = <CancelIcon sx={{ color: 'red' }} />;
    color = 'red';
    label = 'Over Budget';
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
      {icon}
      <Typography variant="body2" sx={{ color, fontWeight: 500 }}>
        {label} 
      </Typography>
    </Box>
  );
}
