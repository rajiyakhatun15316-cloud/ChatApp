import { AppBar, Toolbar, Typography, Box, Avatar, IconButton } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import StarsIcon from '@mui/icons-material/Stars';

export default function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#0d1117', boxShadow: 'none', borderBottom: '1px solid #21262d' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 1, sm: 4 } }}>
        <Typography variant="h6" fontWeight="bold" sx={{ cursor: 'pointer', color: '#fff', fontSize: { xs: '1.1rem', sm: '1.25rem' } }} onClick={() => navigate('/')}>
          Social
        </Typography>
        <Box display="flex" alignItems="center" gap={{ xs: 0.5, sm: 2 }}>
          <Avatar 
            sx={{ width: { xs: 30, sm: 35 }, height: { xs: 30, sm: 35 }, bgcolor: '#0b7beb', border: '2px solid #4caf50', cursor: 'pointer', fontSize: { xs: 14, sm: 16 } }}
            onClick={handleLogout}
          >
            {user.username.charAt(0).toUpperCase()}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
