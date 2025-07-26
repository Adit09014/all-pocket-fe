import {
  Typography,
  Button,
  useTheme,
  Box
} from '@mui/material';

import { tokens } from "../../theme";
import {useNavigate} from "react-router-dom"

export const Homepage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate=useNavigate();

  const handleClick=()=>{
    navigate("/signup")
  }

  return (
    <Box
      sx={{
        backgroundColor: colors.blueAccent[900],
        width: '100vw',
        minHeight: '90vh',
        overflowX: 'hidden'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <img src="home.png" style={{ width: '50%', height: '50%', marginTop: 50 }} alt="Home" />
      </div>

      <Typography variant="h1" align="center" sx={{ marginTop: 2 }}>
        Control your finances, all in one place.
      </Typography>

      <Typography variant="h4" align="center" sx={{ marginTop: 2 }}>
        One powerful dashboard to manage multiple bank accounts, stock investments, FDs, bills, debts, and loans — simplified and centralized.
      </Typography>

      <Button variant="contained" color="secondary" sx={{ display: 'block', margin: '20px auto' }} onClick={handleClick}>
        Get Started
      </Button>
    </Box>
  );
};
