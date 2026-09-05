import { useState, useContext } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import API from '../api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch, error } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await API.post('/api/auth/login', { email, password });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f0f2f5">
      <Paper elevation={3} sx={{ p: 4, width: 400, textAlign: 'center', borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          TaskPlanet Social
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Connect with friends and the world around you.
        </Typography>
        
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField 
            label="Email" 
            variant="outlined" 
            type="email" 
            fullWidth 
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField 
            label="Password" 
            variant="outlined" 
            type="password" 
            fullWidth 
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          {error && <Typography color="error">Invalid credentials</Typography>}
          <Button type="submit" variant="contained" size="large" sx={{ py: 1.5, fontWeight: 'bold' }}>
            Log In
          </Button>
          <Box display="flex" justifyContent="center" gap={1} mt={2}>
            <Typography variant="body2">Don't have an account?</Typography>
            <Link to="/register" style={{ color: '#0b7beb', textDecoration: 'none', fontWeight: 'bold' }}>
              Sign Up
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
