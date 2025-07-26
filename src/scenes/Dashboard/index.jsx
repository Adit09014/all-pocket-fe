import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, useTheme, Stack } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import { Header } from '../../Components/Headers';
import { tokens } from '../../theme';

export const Dashboard = ({ isSideBar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [account, setAccount] = useState([]);
  const [investment, setInvestment] = useState([]);
  const [debt, setDebt] = useState([]);
  const [lent, setLent] = useState([]);
  const [expense,setExpense]=useState([]);
  const [budget,setBudget]=useState([]);

  const getAccount = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/accounts",{
        withCredentials:true
      });
      setAccount(res.data);
    } catch (err) {
      console.log("error fetching accounts:", err);
    }
  };

  const getInvestment = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/investments",{
        withCredentials:true
      });
      setInvestment(res.data);
    } catch (err) {
      console.log("error fetching investments:", err);
    }
  };

  const getDebt = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/debt",{
        withCredentials:true
      });
      setDebt(res.data);
    } catch (err) {
      console.log("error fetching debts:", err);
    }
  };

  const getLent = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/lent",{
        withCredentials:true
      });
      setLent(res.data);
    } catch (err) {
      console.log("error fetching lents:", err);
    }
  };

  const getExpense = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/expenses",{
        withCredentials:true
      });
      setExpense(res.data);
    } catch (err) {
      console.log("error fetching expenses:", err);
    }
  };

  const getBudget = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/budgets",{
        withCredentials:true
      });
      setBudget(res.data);
    } catch (err) {
      console.log("error fetching budgets:", err);
    }
  };

  useEffect(() => {
    getAccount();
    getInvestment();
    getDebt()
    getLent();
    getExpense(),
    getBudget();
  }, []);

  return (
    <Box
      height="calc(100vh - 80px)"
      p="20px"
      boxSizing="border-box"
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={-3}>
        <Header title="DASHBOARD" subtitle="Welcome to your Dashboard" />
      </Box>

      <Box
        flexGrow={1}
        display="grid"
        gridTemplateColumns="repeat(6, 1fr)"
        gap="10px"
      >
        {/* Accounts */}
  <Box
  gridColumn="span 2"
  p={2}
  display="flex"
  flexDirection="column"
  height="100%"
  backgroundColor={colors.primary[400]}
  sx={{ 
    backdropFilter: 'blur(10px)',
    borderRadius: '5px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 25px rgba(0, 255, 0, 0.3)',
    },
    border: `1px solid ${colors.grey[100]}`,
    fontFamily: `'Poppins', sans-serif`
  }}
>
  <Typography
    variant="h3"
    color={colors.greenAccent[300]}
    sx={{
      fontWeight: '800',
      mb: 2,
      textTransform: 'uppercase',
      letterSpacing: '2px'
    }}
  >
    Accounts
  </Typography>

  <Box display="flex" gap={2} flex={1}>
    <Stack direction="column" spacing={1} flex={1}>
      <Stack direction="row" spacing={6} sx={{ mb: 0 }}>
        <Typography variant="h6" sx={{ width: "10%", color: colors.grey[300], fontWeight: 500, fontFamily: 'Roboto Mono, monospace' }}>
          SNo.
        </Typography>
        <Typography variant="h6" sx={{ width: "40%", color: colors.grey[300], fontWeight: 500, fontFamily: 'Roboto Mono, monospace' }}>
          Name
        </Typography>
        <Typography variant="h6" sx={{ width: "30%", color: colors.grey[300], fontWeight: 500, fontFamily: 'Roboto Mono, monospace' }}>
          Balance
        </Typography>
      </Stack>

      {account.slice(0, 5).map((acc, idx) => (
        <Stack
          key={idx}
          direction="row"
          spacing={6}
          alignItems="center"
        >
          <Typography variant='body2' sx={{ width: "10%", color: colors.grey[100], fontFamily: 'Roboto Mono, monospace' }}>
            {idx + 1}.
          </Typography>
          <Typography variant='body2' sx={{ width: "40%", color: colors.grey[100], fontFamily: 'Roboto Mono, monospace' }}>
            {acc.accountname}
          </Typography>
          <Typography variant='body2' sx={{ width: "30%", color: colors.grey[100], fontFamily: 'Roboto Mono, monospace' }}>
            {acc.balance}
          </Typography>
        </Stack>
      ))}

      
    </Stack>

    {!isSideBar && (
      <Box sx={{ maxWidth: "150px" }}>
        <PieChart
          series={[{
            data: account.map((acc, index) => ({
              id: index,
              value: acc.balance,
              label: acc.accountname,
            })),
            innerRadius: 50,
            outerRadius: 100,
            paddingAngle: 1,
            cornerRadius: 1,
            arcLabelMinAngle: 1,
            arcLabel: (params) => `${params.label}`,
          }]}
          slots={{
            legend: () => { null; }
          }}
          width={200}
          height={150}
        />
      </Box>
    )}
  </Box>
  <Box mt={1}>
        <Typography
          variant="body2"
          sx={{
            color: colors.greenAccent[300],
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'transform 0.2s',
            '&:hover': {
              textDecoration: 'underline',
              transform: 'scale(1.05)'
            }
          }}
          onClick={() => window.location.href = '/accounts'}
        >
          &gt;&gt; See more
        </Typography>
      </Box>
</Box>


        {/* Net Worth Summary */}
<Box
  gridColumn="span 2"
  p={2}
  display="flex"
  flexDirection="column"
  height="100%"
  backgroundColor={colors.primary[400]}
  sx={{ 
    backdropFilter: 'blur(10px)',
    borderRadius: '5px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 25px rgba(0, 255, 0, 0.3)',
    },
    border: `1px solid ${colors.grey[100]}`,
    fontFamily: `'Poppins', sans-serif`
  }}
>
  <Typography
    variant="h3"
    color={colors.greenAccent[300]}
    sx={{
      fontWeight: '800',
      mb: 2,
      textTransform: 'uppercase',
      letterSpacing: '2px'
    }}
  >
    Net Worth Summary
  </Typography>

  <Box display="flex" gap={2} flex={1}>
    <Stack direction="column" spacing={1} flex={1}>
      <Stack direction="row" spacing={6}>
        <Typography variant="h6" sx={{ width: "10%", color: colors.grey[300], fontWeight: 500, fontFamily: 'Roboto Mono, monospace' }}>
          SNo.
        </Typography>
        <Typography variant="h6" sx={{ width: "50%", color: colors.grey[300], fontWeight: 500, fontFamily: 'Roboto Mono, monospace' }}>
          Source
        </Typography>
        <Typography variant="h6" sx={{ width: "30%", color: colors.grey[300], fontWeight: 500, fontFamily: 'Roboto Mono, monospace' }}>
          Amount
        </Typography>
      </Stack>

      <Stack direction="row" spacing={6} alignItems="center">
        <Typography variant='body2' sx={{ width: "10%", color: colors.grey[100], fontFamily: 'Roboto Mono, monospace' }}>
          1.
        </Typography>
        <Typography variant='body2' sx={{ width: "50%", color: colors.grey[100], fontFamily: 'Roboto Mono, monospace' }}>
          Bank Accounts
        </Typography>
        <Typography variant='body2' sx={{ width: "30%", color: colors.grey[100], fontFamily: 'Roboto Mono, monospace' }}>
          ₹{account.reduce((acc, curr) => acc + Number(curr.balance), 0)}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={6} alignItems="center">
        <Typography variant='body2' sx={{ width: "10%", color: colors.grey[100], fontFamily: 'Roboto Mono, monospace' }}>
          2.
        </Typography>
        <Typography variant='body2' sx={{ width: "50%", color: colors.grey[100], fontFamily: 'Roboto Mono, monospace' }}>
          Investments
        </Typography>
        <Typography variant='body2' sx={{ width: "30%", color: colors.grey[100], fontFamily: 'Roboto Mono, monospace' }}>
          ₹{investment.reduce((acc, curr) => acc + Number(curr.amount), 0)}
        </Typography>
      </Stack>
    </Stack>

    {!isSideBar && (
      <Box sx={{ maxWidth: "150px" }}>
        <PieChart
          series={[{
            data: [
              {
                id: 0,
                value: account.reduce((acc, curr) => acc + Number(curr.balance), 0),
                label: 'Accounts'
              },
              {
                id: 1,
                value: investment.reduce((acc, curr) => acc + Number(curr.amount), 0),
                label: 'Investments'
              }
            ],
            innerRadius: 50,
            outerRadius: 100,
            paddingAngle: 1,
            cornerRadius: 1,
            arcLabelMinAngle: 1,
            arcLabel: (params) => `${params.label}`,
          }]}
          slots={{
            legend: () => { null; }
          }}
          width={200}
          height={150}
        />
      </Box>
    )}
  </Box>
</Box>


        {/* Debts */}
        <Box
  gridColumn="span 2"
  p={2}
  display="flex"
  flexDirection="column"
  height="100%"
  backgroundColor={colors.primary[400]}
  sx={{ 
    backdropFilter: 'blur(10px)',
    borderRadius: '5px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 25px rgba(0, 255, 0, 0.3)',
    },
    border: `1px solid ${colors.grey[100]}`,
    fontFamily: `'Poppins', sans-serif`
  }}
>
  <Typography
    variant="h3"
    color={colors.greenAccent[300]}
    sx={{
      fontWeight: '800',
      mb: 2,
      textTransform: 'uppercase',
      letterSpacing: '2px'
    }}
  >
    Debts and Lents
  </Typography>

  <Box display="flex" flex={1} gap={2}>
    {/* Lenders */}
    <Box flex={1} display="flex" flexDirection="column" gap={1}>
      <Typography
        variant="h5"
        color={colors.grey[300]}
        sx={{
          borderBottom: `1px solid ${colors.grey[500]}`,
          pb: 1,
          fontWeight: 600
        }}
      >
        Lenders
      </Typography>

      <Stack direction="row" justifyContent="space-between" px={1}>
        <Typography variant="body2" sx={{ color: colors.grey[400], width: "10%", fontFamily: 'Roboto Mono' }}>SNo.</Typography>
        <Typography variant="body2" sx={{ color: colors.grey[400], width: "40%", fontFamily: 'Roboto Mono' }}>Name</Typography>
        <Typography variant="body2" sx={{ color: colors.grey[400], width: "30%", fontFamily: 'Roboto Mono' }}>Amount</Typography>
      </Stack>

      {lent.slice(0, 5).map((lents, idx) => (
        <Stack key={idx} direction="row" justifyContent="space-between" px={1}>
          <Typography sx={{ color: colors.grey[100], width: "10%", fontFamily: 'Roboto Mono' }}>{idx + 1}</Typography>
          <Typography sx={{ color: colors.grey[100], width: "40%", fontFamily: 'Roboto Mono' }}>{lents.person}</Typography>
          <Typography sx={{ color: colors.grey[100], width: "30%", fontFamily: 'Roboto Mono' }}>{lents.amount}</Typography>
        </Stack>
      ))}
    </Box>

    {/* Divider */}
    <Box width="1px" bgcolor={colors.grey[600]} />

    {/* Debtors */}
    <Box flex={1} display="flex" flexDirection="column" gap={1}>
      <Typography
        variant="h5"
        color={colors.grey[300]}
        sx={{
          borderBottom: `1px solid ${colors.grey[500]}`,
          pb: 1,
          fontWeight: 600
        }}
      >
        Debtors
      </Typography>

      <Stack direction="row" justifyContent="space-between" px={1}>
        <Typography variant="body2" sx={{ color: colors.grey[400], width: "10%", fontFamily: 'Roboto Mono' }}>SNo.</Typography>
        <Typography variant="body2" sx={{ color: colors.grey[400], width: "40%", fontFamily: 'Roboto Mono' }}>Name</Typography>
        <Typography variant="body2" sx={{ color: colors.grey[400], width: "30%", fontFamily: 'Roboto Mono' }}>Amount</Typography>
      </Stack>

      {debt.slice(0, 5).map((debts, idx) => (
        <Stack key={idx} direction="row" justifyContent="space-between" px={1}>
          <Typography sx={{ color: colors.grey[100], width: "10%", fontFamily: 'Roboto Mono' }}>{idx + 1}</Typography>
          <Typography sx={{ color: colors.grey[100], width: "40%", fontFamily: 'Roboto Mono' }}>{debts.person}</Typography>
          <Typography sx={{ color: colors.grey[100], width: "30%", fontFamily: 'Roboto Mono' }}>{debts.amount}</Typography>
        </Stack>
      ))}
    </Box>
  </Box>

  <Box mt={1}>
    <Typography
      variant="body2"
      sx={{
        color: colors.greenAccent[300],
        cursor: 'pointer',
        fontFamily: 'Roboto Mono',
        '&:hover': {
          textDecoration: 'underline'
        }
      }}
      onClick={() => window.location.href = '/debt'}
    >
      &gt;&gt; See more
    </Typography>
  </Box>
</Box>

        <Box
  gridColumn="span 2"
  p={2}
  display="flex"
  flexDirection="column"
  height="100%"
  backgroundColor={colors.primary[400]}
  sx={{ 
    backdropFilter: 'blur(10px)',
    borderRadius: '5px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 25px rgba(0, 255, 0, 0.3)',
    },
    border: `1px solid ${colors.grey[100]}`,
    fontFamily: `'Poppins', sans-serif`
  }}
>
  <Typography
    variant="h3"
    color={colors.greenAccent[300]}
    sx={{
      fontWeight: '800',
      mb: 2,
      textTransform: 'uppercase',
      letterSpacing: '2px'
    }}
  >
    Investments
  </Typography>

  <Box display="flex" gap={2} flex={1}>
    <Stack direction="column" spacing={1} flex={1}>
      <Stack direction="row" spacing={6} sx={{ mb: 0 }}>
        <Typography variant="h5" sx={{ width: "10%", color: colors.grey[300], fontFamily: 'Roboto Mono' }}>SNo.</Typography>
        <Typography variant="h5" sx={{ width: "40%", color: colors.grey[300], fontFamily: 'Roboto Mono' }}>Name</Typography>
        <Typography variant="h5" sx={{ width: "30%", color: colors.grey[300], fontFamily: 'Roboto Mono' }}>Amount</Typography>
      </Stack>

      {investment.slice(0, 5).map((invest, idx) => (
        <Stack
          key={idx}
          direction="row"
          spacing={6}
          alignItems="center"
        >
          <Typography variant='body1' sx={{ width: "10%", color: colors.grey[100], fontFamily: 'Roboto Mono' }}>{idx + 1}.</Typography>
          <Typography variant='body1' sx={{ width: "40%", color: colors.grey[100], fontFamily: 'Roboto Mono' }}>{invest.investmentname}</Typography>
          <Typography variant='body1' sx={{ width: "30%", color: colors.grey[100], fontFamily: 'Roboto Mono' }}>{invest.amount}</Typography>
        </Stack>
      ))}
    </Stack>

    {!isSideBar && (
      <Box sx={{ maxWidth: "150px" }}>
        <PieChart
          series={[{
            data: investment.map((invest, index) => ({
              id: index,
              value: invest.amount,
              label: invest.investmentname,
            })),
            innerRadius: 50,
            outerRadius: 100,
            paddingAngle: 1,
            cornerRadius: 1,
            arcLabelMinAngle: 1,
            arcLabel: (params) => `${params.label}`,
          }]}
          slots={{
            legend: () => { null; }
          }}
          width={200}
          height={150}
        />
      </Box>
    )}
  </Box>

  <Box mt={1}>
    <Typography
      variant="body2"
      sx={{
        color: colors.greenAccent[300],
        cursor: 'pointer',
        fontFamily: 'Roboto Mono',
        '&:hover': {
          textDecoration: 'underline'
        }
      }}
      onClick={() => window.location.href = '/investment'}
    >
      &gt;&gt; See more
    </Typography>
  </Box>
</Box>

        {/* Card 5 */}
        <Box
  gridColumn="span 2"
  p={2}
  display="flex"
  flexDirection="column"
  height="100%"
  backgroundColor={colors.primary[400]}
  sx={{ 
    backdropFilter: 'blur(10px)',
    borderRadius: '5px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 25px rgba(0, 255, 0, 0.3)',
    },
    border: `1px solid ${colors.grey[100]}`,
    fontFamily: `'Poppins', sans-serif`
  }}
>
  <Typography
    variant="h3"
    color={colors.greenAccent[400]}
    sx={{
      fontWeight: '800',
      mb: 2,
      textTransform: 'uppercase',
      letterSpacing: '2px'
    }}
  >
    Expenses
  </Typography>

  <Box display="flex" gap={2} flex={1}>
    <Stack direction="column" spacing={1} flex={1}>
      <Stack direction="row" spacing={6} sx={{ mb: 0 }}>
        <Typography variant="h5" sx={{ width: "10%", color: colors.grey[300], fontFamily: 'Roboto Mono' }}>SNo.</Typography>
        <Typography variant="h5" sx={{ width: "40%", color: colors.grey[300], fontFamily: 'Roboto Mono' }}>Category</Typography>
        <Typography variant="h5" sx={{ width: "30%", color: colors.grey[300], fontFamily: 'Roboto Mono' }}>Spent</Typography>
      </Stack>

      {expense.slice(0, 5).map((exp, idx) => (
        <Stack
          key={idx}
          direction="row"
          spacing={6}
          alignItems="center"
        >
          <Typography variant='body1' sx={{ width: "10%", color: colors.grey[100], fontFamily: 'Roboto Mono' }}>{idx + 1}.</Typography>
          <Typography variant='body1' sx={{ width: "40%", color: colors.grey[100], fontFamily: 'Roboto Mono' }}>{exp.category}</Typography>
          <Typography variant='body1' sx={{ width: "30%", color: colors.grey[100], fontFamily: 'Roboto Mono' }}>{exp.spent}</Typography>
        </Stack>
      ))}
    </Stack>
  </Box>

  <Box mt={1}>
    <Typography
      variant="body2"
      sx={{
        color: colors.greenAccent[300],
        cursor: 'pointer',
        fontFamily: 'Roboto Mono',
        '&:hover': {
          textDecoration: 'underline'
        }
      }}
      onClick={() => window.location.href = '/expenses'}
    >
      &gt;&gt; See more
    </Typography>
  </Box>
</Box>


        <Box
  gridColumn="span 2"
  p={2}
  display="flex"
  flexDirection="column"
  height="100%"
  backgroundColor={colors.primary[400]}
  sx={{ 
    backdropFilter: 'blur(10px)',
    borderRadius: '5px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 25px rgba(0, 255, 0, 0.3)',
    },
    border: `1px solid ${colors.grey[100]}`,
    fontFamily: `'Poppins', sans-serif`
  }}
>
  <Typography
    variant="h3"
    color={colors.greenAccent[300]}
    sx={{
      fontWeight: '800',
      mb: 2,
      textTransform: 'uppercase',
      letterSpacing: '2px'
    }}
  >
    Budget Summary
  </Typography>

  <Box display="flex" gap={2} flex={1}>
    <Stack direction="column" spacing={1} flex={1}>
      <Stack direction="row" spacing={6}>
        <Typography variant="h5" sx={{ width: "10%", color: colors.grey[300], fontFamily: 'Roboto Mono' }}>SNo.</Typography>
        <Typography variant="h5" sx={{ width: "30%", color: colors.grey[300], fontFamily: 'Roboto Mono' }}>Category</Typography>
        <Typography variant="h5" sx={{ width: "40%", color: colors.grey[300], fontFamily: 'Roboto Mono' }}>Status</Typography>
      </Stack>

      {budget.slice(0, 5).map((budgets, idx) => (
        <Stack
          key={idx}
          direction="row"
          spacing={6}
          alignItems="center"
        >
          <Typography variant='body1' sx={{ width: "10%", color: colors.grey[100], fontFamily: 'Roboto Mono' }}>{idx + 1}.</Typography>
          <Typography variant='body1' sx={{ width: "30%", color: colors.grey[100], fontFamily: 'Roboto Mono' }}>{budgets.category}</Typography>
          <Typography variant='body1' sx={{ width: "40%", color: colors.grey[100], fontFamily: 'Roboto Mono' }}>
            {`${budgets.spent} / ${budgets.limit}`}
          </Typography>
        </Stack>
      ))}
    </Stack>
  </Box>

  <Box mt={1}>
    <Typography
      variant="body2"
      sx={{
        color: colors.greenAccent[300],
        cursor: 'pointer',
        fontFamily: 'Roboto Mono',
        '&:hover': {
          textDecoration: 'underline'
        }
      }}
      onClick={() => window.location.href = '/budget'}
    >
      &gt;&gt; See more
    </Typography>
  </Box>
</Box>

      </Box>
    </Box>
  );
};
