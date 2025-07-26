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

export const Signin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState(false);
  const [emailErrormsg, setEmailErrormsg] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrormsg, setPasswordErrormsg] = useState('');

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

    if (!isValid) return;

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        window.location.href = "/"; // full page reload to reset all
      } else {
        console.error('Sign-in failed:', result.message || result);
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
      p={2}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: '100%',
          p: 3,
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
              mb: 3,
            }}
          >
            Sign In
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
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
              Sign In
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
            Sign in with Google
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
            Sign in with Facebook
          </Button>

          <Box mt={1}>
            <Typography
              variant="body1"
              sx={{
                color: colors.grey[200],
                cursor: 'pointer',
                fontWeight: 500,
              }}
              onClick={() => window.location.href = '/signup'}
            >
              Don't have account yet? <b>Sign Up now</b>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
