import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ProfileDropdown from '@/components/profileDropdown';

export const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Menu App
        </Typography>

        <ProfileDropdown />
      </Toolbar>
    </AppBar>
  );
};
