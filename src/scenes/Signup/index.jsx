import {
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  Box,
  Button,
  useTheme,
  Divider,
} from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import { GoogleIcon, FacebookIcon } from '../../Components/CustomIcons';
import { AuthContext } from "../../Components/CheckAuth";

export const Signup = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState({ fullname: '', email: '', phonenumber: '', password: '' });
  const [emailError, setEmailError] = useState(false);
  const [emailErrormsg, setEmailErrormsg] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrormsg, setPasswordErrormsg] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrormsg, setNameErrormsg] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrormsg, setPhoneErrormsg] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const textFieldStyle = (theme) => ({
    input: {
      color: theme.palette.mode === 'dark' ? 'white' : 'black',
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 4, 9, 0.8)' : 'white',
      borderRadius: '4px',
      padding: '10px 12px',
      '::placeholder': { color: '#6B7280', opacity: 1 },
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#374151' },
      '&:hover fieldset': { borderColor: '#4B5563' },
      '&.Mui-focused fieldset': { borderColor: '#2563EB' },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    setEmailError(false);
    setPasswordError(false);
    setNameError(false);
    setPhoneError(false);

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      setEmailError(true);
      setEmailErrormsg('Please enter a valid email address.');
    }

    if (!formData.password || formData.password.length < 6) {
      isValid = false;
      setPasswordError(true);
      setPasswordErrormsg('Password must be at least 6 characters long.');
    }

    if (!formData.fullname) {
      isValid = false;
      setNameError(true);
      setNameErrormsg('Please enter your name.');
    }

    if (!formData.phonenumber || !/^\d{10}$/.test(formData.phonenumber)) {
      isValid = false;
      setPhoneError(true);
      setPhoneErrormsg('Please enter a valid 10-digit phone number.');
    }

    if (!isValid) return;

    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify(formData),
      },{
        withCredentials:true
      });

      const result = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
        navigate('/');
        console.log('Sign-up successful:', result);
      } else {
        console.error('Sign-up failed:', result.message || result);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 70px)"
      overflow="hidden"
      bgcolor={colors.primary[400]}
      
    >
      <Card
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 1,
          boxShadow: 4,
          borderRadius: 2,
          backgroundColor: theme.palette.mode === 'dark' ? "#101624" : '#fff',
          overflow: 'hidden',
        }}
      >
        <CardContent>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{
              fontSize: 'clamp(2rem, 10vw, 2.15rem)',
              color: theme.palette.mode === 'dark' ? '#fff' : '#000',
              mb: 2,
            }}
          >
            Sign Up
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl fullWidth>
              <FormLabel sx={{ color: '#6B7280' }}>Full Name</FormLabel>
              <TextField
                required
                placeholder="Your full name"
                variant="outlined"
                error={nameError}
                helperText={nameError ? nameErrormsg : ''}
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                sx={textFieldStyle(theme)}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel sx={{ color: '#6B7280' }}>Email</FormLabel>
              <TextField
                required
                placeholder="your@email.com"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailError ? emailErrormsg : ''}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                sx={textFieldStyle(theme)}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel sx={{ color: '#6B7280' }}>Phone Number</FormLabel>
              <TextField
                required
                placeholder="1234567890"
                type="tel"
                variant="outlined"
                error={phoneError}
                helperText={phoneError ? phoneErrormsg : ''}
                value={formData.phonenumber}
                onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })}
                sx={textFieldStyle(theme)}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel sx={{ color: '#6B7280' }}>Password</FormLabel>
              <TextField
                required
                placeholder="••••••"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordError ? passwordErrormsg : ''}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                sx={textFieldStyle(theme)}
              />
            </FormControl>

            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'black',
                color: theme.palette.mode === 'dark' ? 'black' : 'white',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333',
                },
                mt: 2,
              }}
            >
              Sign Up
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>or</Divider>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              color: '#6B7280',
              borderColor: theme.palette.mode === 'dark' ? 'white' : 'black',
              mb: 1,
            }}
          >
            Sign Up with Google
          </Button>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<FacebookIcon />}
            sx={{
              color: '#6B7280',
              borderColor: theme.palette.mode === 'dark' ? 'white' : 'black',
            }}
          >
            Sign Up with Facebook
          </Button>
          <Box mt={1}>
            <Typography
              variant="body1"
              sx={{
                color: colors.grey[200],
                cursor: 'pointer',
                fontWeight: 500,
              }}
              onClick={() => window.location.href = '/login'}
            >
              Already Have an Account? <b>Log In</b>
            </Typography>
          </Box>
          
        </CardContent>
      </Card>
    </Box>
  );
};
