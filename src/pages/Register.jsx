import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/auth/register', { username, email, password });
      navigate('/login');
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f0f2f5">
      <Paper elevation={3} sx={{ p: 4, width: 400, textAlign: 'center', borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          TaskPlanet Social
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Create a new account
        </Typography>
        
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField 
            label="Username" 
            variant="outlined" 
            fullWidth 
            required
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
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
          {error && <Typography color="error">Registration failed. Username or email might be taken.</Typography>}
          <Button type="submit" variant="contained" color="success" size="large" sx={{ py: 1.5, fontWeight: 'bold' }}>
            Sign Up
          </Button>
          <Box display="flex" justifyContent="center" gap={1} mt={2}>
            <Typography variant="body2">Already have an account?</Typography>
            <Link to="/login" style={{ color: '#0b7beb', textDecoration: 'none', fontWeight: 'bold' }}>
              Log In
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
