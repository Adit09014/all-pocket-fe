import React from 'react';
import { Box, Card, CardContent,useTheme } from '@mui/material';
import DebtManage from './DebtManage';
import LentManage from './LentManage';
import {tokens} from '../../theme';

export default function Debt() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ display:'flex', gap:2, height:'100%', p:2 }}>
      <Card sx={{ flex:1 }} style={{backgroundColor:colors.blueAccent[900]}}><CardContent><DebtManage/></CardContent></Card>
      <Card sx={{ flex:1 }} style={{backgroundColor:colors.blueAccent[900]}}><CardContent><LentManage/></CardContent></Card>
    </Box>
  );
}
