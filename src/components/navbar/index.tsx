import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Menu App
        </Typography>

        <Link href="/profile">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="profile"
          >
            <AccountCircle />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
