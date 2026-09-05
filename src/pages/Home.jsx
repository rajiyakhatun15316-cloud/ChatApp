import React from 'react';
import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import BottomNav from '../components/BottomNav';
import { Box, useMediaQuery, useTheme } from '@mui/material';

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ pb: isMobile ? 8 : 0 }}>
      <Navbar />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 2, sm: 4 }, px: 0 }}>
        <Feed />
      </Box>
      {isMobile && <BottomNav />}
    </Box>
  );
}
