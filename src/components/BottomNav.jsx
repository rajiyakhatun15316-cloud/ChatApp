import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ChatIcon from '@mui/icons-material/Chat';
import { useState } from 'react';

export default function BottomNav() {
  const [value, setValue] = useState(2); // 'Social' is active

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, borderTop: '1px solid #21262d' }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ bgcolor: '#0d1117' }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} sx={{ color: value === 0 ? '#0b7beb' : '#8b949e' }} />
        <BottomNavigationAction label="Tasks" icon={<AssignmentIcon />} sx={{ color: value === 1 ? '#0b7beb' : '#8b949e' }} />
        <BottomNavigationAction label="Social" icon={<PublicIcon />} sx={{ color: value === 2 ? '#0b7beb' : '#8b949e' }} />
        <BottomNavigationAction label="Leader Board" icon={<EmojiEventsIcon />} sx={{ color: value === 3 ? '#0b7beb' : '#8b949e' }} />
        <BottomNavigationAction label="Chat" icon={<ChatIcon />} sx={{ color: value === 4 ? '#0b7beb' : '#8b949e' }} />
      </BottomNavigation>
    </Paper>
  );
}
